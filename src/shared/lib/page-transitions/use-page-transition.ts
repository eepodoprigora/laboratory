import { usePresence } from "motion/react";
import { useEffect, useRef } from "react";
import {
    PAGE_TRANSITION_FADE_MS,
    PAGE_TRANSITION_HOLD_MS,
} from "@/shared/сonfig/const";
import {
    PageTransitionName,
    usePageTransitionStore,
} from "@/shared/model/page-transition";
import { curtainLeave } from "./curtain";
import { leaveInstant } from "./leave-instant";

export type LeaveFn = (data: {
    targetElement?: Element | null;
}) => Promise<void>;

const leaveFnMap: Record<PageTransitionName, LeaveFn> = {
    default: curtainLeave,
    instant: leaveInstant,
};

let sharedLeavePromise: Promise<void> | null = null;

const sleep = (ms: number) =>
    new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
    });

export const usePageTransition = () => {
    const name = usePageTransitionStore((state) => state.name);
    const targetElement = usePageTransitionStore((state) => state.targetElement);
    const setIsTransitioning = usePageTransitionStore(
        (state) => state.setIsTransitioning,
    );
    const resetPageTransition = usePageTransitionStore(
        (state) => state.resetPageTransition,
    );

    const [isPresent, safeToRemove] = usePresence();

    const hasStartedExitRef = useRef(false);

    useEffect(() => {
        if (isPresent || hasStartedExitRef.current) {
            return;
        }

        hasStartedExitRef.current = true;

        const isOwner = !sharedLeavePromise;

        if (isOwner) {
            setIsTransitioning(true);
            sharedLeavePromise = leaveFnMap[name]({ targetElement });
        }

        let isCancelled = false;

        const run = async () => {
            await sharedLeavePromise;

            if (isCancelled) {
                return;
            }

            await sleep(PAGE_TRANSITION_FADE_MS + PAGE_TRANSITION_HOLD_MS);

            if (isCancelled) {
                return;
            }

            safeToRemove();

            await sleep(PAGE_TRANSITION_FADE_MS);

            if (isOwner) {
                sharedLeavePromise = null;
                resetPageTransition();
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
        setIsTransitioning,
        targetElement,
    ]);
};