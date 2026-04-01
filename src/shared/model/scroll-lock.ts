import { create } from 'zustand';

type State = {
    scrollLocked: boolean;
};

type Action = {
    setScrollLocked: (state: State['scrollLocked']) => void;
};

export const useScrollLockedStore = create<State & Action>((set) => ({
    scrollLocked: false,
    setScrollLocked: (newState) => set(() => ({ scrollLocked: newState })),
}));
