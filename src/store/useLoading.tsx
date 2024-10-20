import { create } from 'zustand';

type loadingState = {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<loadingState>((set) => ({
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading })
}))