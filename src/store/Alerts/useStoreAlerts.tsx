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
    error: boolean;
    error_message: string;
    fetchAlert: (token: string) => void;
}

export const useAlertStore = create<alertStoreType>((set) => ({
    alertData: [],
    isLoading: false,
    error: false,
    error_message: '',
    fetchAlert: async (token) => {
        
        set({ isLoading: true })
        try {
            const response = await axios.get('https://emergeton-api.onrender.com/api/v1/alerts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            set({ alertData: response.data.data, isLoading: false })
        } catch (error) {
            if(error instanceof AxiosError){
                set({ error: true, error_message: error.response?.data.message || 'An error occured', isLoading: false })
            }
        }
        
    }
}))