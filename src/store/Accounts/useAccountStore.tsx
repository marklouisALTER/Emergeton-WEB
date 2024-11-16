import axios, { AxiosError } from 'axios';
import { create } from 'zustand';

type userProfileType = {
    firstname: string;
    lastname: string;
    email: string;
}

type useStoreType = {
    user: userProfileType;
    isLoading: boolean;
    status: 'idle' | 'success' | 'error';
    message: string;
    fetchAccount: (token: string) => void;
}

export const useAccountStore = create<useStoreType>((set)=> ({
    user: {
        firstname: '',
        lastname: '',
        email: '',
    },
    isLoading: false,
    status: 'idle',
    message: '',
    fetchAccount: async (token: string) => {
        set({ isLoading: true, status: 'idle', message: '' })
        try {
            const response = await axios.get('https://emergeton-api.onrender.com/api/v1/acccount', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            set({ isLoading: false, status: 'success', message: '', user: response.data })
        }catch(error){
            if(error instanceof AxiosError){
                set({ isLoading: false, status: 'error', message: error.response?.data.message || 'An error occurred' })
            }
        }
    }
}))

