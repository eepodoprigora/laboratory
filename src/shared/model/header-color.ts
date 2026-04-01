import { create } from 'zustand';

type State = {
    headerClass: string | null;
};
type Action = {
    setHeaderClass: (v: string | null) => void;
};

export const useHeaderColorStore = create<State & Action>((set) => ({
    headerClass: null,
    setHeaderClass: (v) => set({ headerClass: v }),
}));
