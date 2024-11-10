import { create } from 'zustand'

type modalStoreType = {
    isOpen: boolean;
    alertId: string;
    alert_type: string;
    openModal: (alertId: string, alert_type: string) => void;
    closeModal: () => void;
}

export const useDispatchModalStore = create<modalStoreType>((set) => ({
    isOpen: false,
    alertId: '',
    alert_type: '',
    openModal: (alertId:string, alert_type:string) => set({ isOpen: true,  alertId , alert_type }),
    closeModal: () => set({ isOpen: false, alertId: '' }),
}))