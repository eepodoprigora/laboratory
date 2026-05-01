import { create } from 'zustand';

type State = {
    appReady: boolean;
};

type Action = {
    setAppReady: (state: State['appReady']) => void;
};

export const useAppReadyStore = create<State & Action>((set) => ({
    appReady: false,
    setAppReady: (newState) => set(() => ({ appReady: newState })),
}));
