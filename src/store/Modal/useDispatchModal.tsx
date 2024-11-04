import { create } from 'zustand'

type modalStoreType = {
    isOpen: boolean;
    departmentId: number;
    alertId: string;
    openModal: (departmentId:number, alertId:string) => void;
    closeModal: () => void;
}

export const useDispatchModalStore = create<modalStoreType>((set) => ({
    isOpen: false,
    departmentId: 0,
    alertId: '',
    openModal: (departmentId:number, alertId:string) => set({ isOpen: true, departmentId, alertId }),
    closeModal: () => set({ isOpen: false, departmentId: 0, alertId: '' }),
}))