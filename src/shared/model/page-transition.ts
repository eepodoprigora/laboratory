import { create } from "zustand";

export type PageTransitionName = "default" | "instant";

type SetPageTransitionData = {
    name?: PageTransitionName;
    targetElement?: Element | null;
};

type PageTransitionState = {
    name: PageTransitionName;
    targetElement: Element | null;
    isTransitioning: boolean;
    setPageTransition: (data?: SetPageTransitionData) => void;
    setIsTransitioning: (value: boolean) => void;
    resetPageTransition: () => void;
};

export const usePageTransitionStore = create<PageTransitionState>((set) => ({
    name: "default",
    targetElement: null,
    isTransitioning: false,

    setPageTransition: (data) => {
        set({
            name: data?.name ?? "default",
            targetElement: data?.targetElement ?? null,
        });
    },

    setIsTransitioning: (value) => {
        set({ isTransitioning: value });
    },

    resetPageTransition: () => {
        set({
            name: "default",
            targetElement: null,
            isTransitioning: false,
        });
    },
}));