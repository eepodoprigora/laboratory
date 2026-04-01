import { usePresence } from 'motion/react';
import { useEffect, useRef } from 'react';
import { PageTransitionName, usePageTransitionStore } from '@/shared/model/page-transition';
import { leaveInstant } from './leave-instant';
import { curtainLeave } from './curtain';
import { PAGE_TRANSITION_ENTER_MS } from '@/shared/сonfig/const';

export type LeaveFn = (data: { targetElement?: Element | null }) => Promise<void>;

const leaveFnMap: Record<PageTransitionName, LeaveFn> = {
    default: curtainLeave,
    instant: leaveInstant,
};

let sharedLeavePromise: Promise<void> | null = null;

export const usePageTransition = () => {
    const name = usePageTransitionStore((state) => state.name);
    const targetElement = usePageTransitionStore((state) => state.targetElement);
    const resetPageTransition = usePageTransitionStore((state) => state.resetPageTransition);
    const setIsLeaving = usePageTransitionStore((state) => state.setIsLeaving);
    const setIsEntering = usePageTransitionStore((state) => state.setIsEntering);
    const [isPresent, safeToRemove] = usePresence();

    const hasStartedExitRef = useRef(false);
    const hasHandledEnterRef = useRef(false);

    useEffect(() => {
        if (isPresent || hasStartedExitRef.current) {
            return;
        }

        hasStartedExitRef.current = true;

        const isOwner = !sharedLeavePromise;

        if (isOwner) {
            setIsLeaving(true);
            setIsEntering(false);

            sharedLeavePromise = leaveFnMap[name]({ targetElement }).then(() => {
                resetPageTransition();
            });
        }

        let isCancelled = false;

        const run = async () => {
            await sharedLeavePromise;

            if (isCancelled) {
                return;
            }

            safeToRemove();

            if (isOwner) {
                sharedLeavePromise = null;
                setIsLeaving(false);
                setIsEntering(true);
            }
        };

        void run();

        return () => {
            isCancelled = true;
        };
    }, [
        isPresent,
        name,
        resetPageTransition,
        safeToRemove,
        setIsEntering,
        setIsLeaving,
        targetElement,
    ]);

    useEffect(() => {
        if (!isPresent || hasHandledEnterRef.current) {
            return;
        }

        hasHandledEnterRef.current = true;

        const timeoutId = window.setTimeout(() => {
            setIsEntering(false);
        }, PAGE_TRANSITION_ENTER_MS);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [isPresent, setIsEntering]);
};