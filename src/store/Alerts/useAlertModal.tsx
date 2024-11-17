import { create } from 'zustand';

type alertModalType = {
    id: string;
    isOpen: boolean;
    openAlertModal: (id: string) => void;
    closeModal: () => void;
}

export const useAlertModal = create<alertModalType>((set) => ({
    id: '',
    isOpen: false,
    openAlertModal: (id: string) => {
        set({ id, isOpen: true });
    },
    closeModal: () => set({ isOpen: false, id: '' })
}));   