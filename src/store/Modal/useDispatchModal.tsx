import { create } from 'zustand'

type modalStoreType = {
    isOpen: boolean;
    alertId: string;
    openModal: (alertId:string) => void;
    closeModal: () => void;
}

export const useDispatchModalStore = create<modalStoreType>((set) => ({
    isOpen: false,
    alertId: '',
    openModal: (alertId:string) => set({ isOpen: true,  alertId }),
    closeModal: () => set({ isOpen: false, alertId: '' }),
}))