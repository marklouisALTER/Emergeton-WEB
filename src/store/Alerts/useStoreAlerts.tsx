import axios from 'axios';
import { create } from 'zustand'

type alertDataType = {
    message: string;
    alertType: string;
    alert_status: string;
    date: string;
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
    fetchAlert: (token: string) => void;
}

export const useAlertStore = create<alertStoreType>((set) => ({
    alertData: [],
    fetchAlert: async (token) => {
        const response = await axios.get('https://emergeton-api.onrender.com/api/v1/alerts', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const alertData = response.data.data
        // console.log(response.data.data)
        set({ alertData })
    }
}))