import axios, { AxiosError } from 'axios';
import { create } from 'zustand'

type alertDataType = {
    message: string;
    alert_type: string;
    alert_status: string;
    created_at: number;
    id: string;
    residentID: string;
    latitude: number;
    longitude: number;
    address: string;
    first_name: string;
    last_name: string;
}

type alertStoreType = {
    alertData: alertDataType[];
    isLoading: boolean;
    status: 'idle' | 'success' | 'error';
    message: string;
    token: string;
    fetchAlert: (token: string) => void;
    changeAlertStatus: (alertID: string, status: string) => void;
}

export const useAlertStore = create<alertStoreType>((set, get) => ({
    alertData: [],
    isLoading: false,
    status: 'idle',
    token: '',
    message: '',
    fetchAlert: async (token) => {
        
        set({ isLoading: true })
        try {
            const response = await axios.get('https://emergeton-api.onrender.com/api/v1/alerts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            set({ alertData: response.data.data, isLoading: false, token })
        } catch (error) {
            if(error instanceof AxiosError){
                set({ status: 'error', message: error.response?.data.message || 'An error occured', isLoading: false })
            }
        }
        
    },
    changeAlertStatus: async (alertID, status) => {
        set({ isLoading: true })
        const token = get().token;
        try {
            await axios.patch(`https://emergeton-api.onrender.com/api/v1/alerts/update/${alertID}`, {
                alert_status: status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            set({ status: 'success', message: 'Alert status updated successfully', isLoading: false })
            set((state) => ({
                alertData: state.alertData.map((alert) => {
                    if(alert.id === alertID){
                        return {
                            ...alert,
                            alert_status: status
                        }
                    }
                    return alert
                })
            }))
        } catch (error) {
            if(error instanceof AxiosError){
                set({ status: 'error', message: error.response?.data.message || 'An error occured', isLoading: false })
            }
        }
    }
}))