import axios, { AxiosError } from 'axios';
import { create } from 'zustand';

type userProfileType = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}

type useStoreType = {
    user: userProfileType;
    isLoading: boolean;
    status: 'idle' | 'success' | 'error';
    message: string;
    userToken: string;
    fetchAccount: (token: string) => void;
    changePassword: (token: string, current_password: string, new_password: string, confirm_password: string) => void;
    updateAccount: (data: { first_name: string, last_name: string, email: string }) => void;
}

export const useAccountStore = create<useStoreType>((set, get)=> ({
    user: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
    },
    isLoading: false,
    status: 'idle',
    userToken: '',
    message: '',
    fetchAccount: async (token: string) => {
        set({ isLoading: true, status: 'idle', message: '' })
        try {
            const response = await axios.get('https://emergeton-api.onrender.com/api/v1/account', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            set({ isLoading: false, user: response.data.data, userToken: token })
        }catch(error){
            if(error instanceof AxiosError){
                set({ isLoading: false, status: 'error', message: error.response?.data.message || 'An error occurred' })
            }
        }
    },
    changePassword: async (token: string, current_password: string, new_password: string, confirm_password: string) => {
        set({ isLoading: true, status: 'idle', message: '' })
        try {
            const response = await axios.post('https://emergeton-api.onrender.com/api/v1/account/update-password', {
                current_password,
                new_password,
                confirm_password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            set({ isLoading: false, status: 'success', message: response.data.message })
        }catch(error){
            if(error instanceof AxiosError){
                set({ isLoading: false, status: 'error', message: error.response?.data.message || 'An error occurred' })
            }
        }
    },
    updateAccount: async (data: { first_name: string, last_name: string, email: string }) => {
        set({ isLoading: true, status: 'idle', message: '' })

        const token = get().userToken;

        try {
            const response = await axios.patch('https://emergeton-api.onrender.com/api/v1/account/update', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            set((state) => ({... state, user: {...state.user, ...data} }))

            set({ isLoading: false, status: 'success', message: response.data.message })
            console.log(response.data.message)
        }catch(error){
            if(error instanceof AxiosError){
                set({ isLoading: false, status: 'error', message: error.response?.data.message || 'An error occurred' })
            }
        }
    }

}))

