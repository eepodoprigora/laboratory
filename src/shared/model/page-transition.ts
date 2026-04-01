import { create } from 'zustand';

export type PageTransitionName = 'default' | 'instant';
export type PageTransitionMode = 'wait' | 'sync' | 'popLayout';

export const DEFAULT_MODE: PageTransitionMode = 'wait';
export const DEFAULT_NAME: PageTransitionName = 'default';

type State = {
    mode: PageTransitionMode;
    name: PageTransitionName;
    targetElement?: Element | null;
    isLeaving: boolean;
    isEntering: boolean;
};

type Action = {
    setPageTransition: (transition: Omit<State, 'isLeaving' | 'isEntering'>) => void;
    resetPageTransition: () => void;
    setIsLeaving: (value: boolean) => void;
    setIsEntering: (value: boolean) => void;
};

export const usePageTransitionStore = create<State & Action>((set) => ({
    mode: DEFAULT_MODE,
    name: DEFAULT_NAME,
    targetElement: null,
    isLeaving: false,
    isEntering: false,
    setPageTransition: (transition) =>
        set(() => ({
            ...transition,
        })),
    resetPageTransition: () =>
        set(() => ({
            mode: DEFAULT_MODE,
            name: DEFAULT_NAME,
            targetElement: null,
        })),
    setIsLeaving: (value) =>
        set(() => ({
            isLeaving: value,
        })),
    setIsEntering: (value) =>
        set(() => ({
            isEntering: value,
        })),
}));