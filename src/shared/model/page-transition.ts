import { create } from "zustand";

export type PageTransitionName = "default" | "instant";
export type PageTransitionMode = "sync" | "wait" | "popLayout";

type PageTransitionState = {
    name: PageTransitionName;
    mode: PageTransitionMode;
    targetElement: Element | null;
    isTransitioning: boolean;
    isLeaving: boolean;
    isHolding: boolean;
    isEntering: boolean;
    setPageTransition: (data?: {
        name?: PageTransitionName;
        mode?: PageTransitionMode;
        targetElement?: Element | null;
    }) => void;
    setIsTransitioning: (value: boolean) => void;
    setIsLeaving: (value: boolean) => void;
    setIsHolding: (value: boolean) => void;
    setIsEntering: (value: boolean) => void;
    resetPageTransition: () => void;
};

export const usePageTransitionStore = create<PageTransitionState>((set) => ({
    name: "default",
    mode: "wait",
    targetElement: null,
    isTransitioning: false,
    isLeaving: false,
    isHolding: false,
    isEntering: false,

    setPageTransition: (data) => {
        set({
            name: data?.name ?? "default",
            mode: data?.mode ?? "wait",
            targetElement: data?.targetElement ?? null,
        });
    },

    setIsTransitioning: (value) => set({ isTransitioning: value }),
    setIsLeaving: (value) => set({ isLeaving: value }),
    setIsHolding: (value) => set({ isHolding: value }),
    setIsEntering: (value) => set({ isEntering: value }),

    resetPageTransition: () => {
        set({
            name: "default",
            mode: "wait",
            targetElement: null,
            isTransitioning: false,
            isLeaving: false,
            isHolding: false,
            isEntering: false,
        });
    },
}));