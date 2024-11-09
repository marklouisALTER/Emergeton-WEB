import axios, { AxiosError } from 'axios';
import { create } from 'zustand';

 type residentType = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    user_type: string;
    verified: boolean;
    contact_number: string;
    address: string;
    landmark: string;
    created_at: string;
 }

 type residentStore = {
    residents: residentType[];
    isLoading: boolean;
    error: boolean;
    error_message?: string;
    fetchResidents: (token: string) => void;
    setResidentVerify: (token: string, id: string) => void;
 }

 export const useResidentsStore = create<residentStore>((set, get) => ({
    residents: [],
    error: false,
    isLoading: false,
    fetchResidents: async (token: string) => {
        set({ isLoading: true, error: false });
        try {
            const residents = await axios.get('https://emergeton-api.onrender.com/api/v1/residents', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            set({ residents: residents.data.data, isLoading: false });
        }
        catch (error) {
            if(error instanceof AxiosError){
                set({ error: true, error_message: error.response?.data.message, isLoading: false });
            }
        }
    },
    setResidentVerify: async (token: string, id: string) => {
        set({ isLoading: true, error: false });
        try {
            await axios.patch(`https://emergeton-api.onrender.com/api/v1/residents/verify/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { residents } = get();

            set({ isLoading: false, residents: residents.map((resident) =>  resident.id === id ? { ...resident, verified: true } : resident ) });
        }
        catch (error) {
            if(error instanceof AxiosError){
                set({ error: true, error_message: error.response?.data.message, isLoading: false });
            }
        }
    }
 }));