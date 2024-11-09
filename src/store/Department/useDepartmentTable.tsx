import axios, { AxiosError } from 'axios';
import { create } from 'zustand';

type departmentType = {
    id: number;
    name: string;
    email: string;
    contact_number: string;
    address: string;
    status: string;
    tags: string;
    created_at?: string;
}

type departmentTableProps = {
    data: departmentType[];
    error: boolean;
    success: boolean;
    response: {
        title: string;
        message: string;
    };
    isLoading: boolean;
    fetchData: (token: string) => void;
    deleteData: (id: number, token: string) => void;
    addData: (data: {
        name: string;
        email: string;
        contact_number: string;
        address: string;
        status: string;
        tags: string;
    }, token: string) => void;
}

export const useDepartmentTable = create<departmentTableProps>((set) => ({
    data: [],
    error: false,
    success: false,
    response: {
        title: '',
        message: ''
    },
    isLoading: false,
    fetchData: async (token) => {
        set({ isLoading: true });
        try{
            const response = await axios.get('https://emergeton-api.onrender.com/api/v1/departments', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = response.data.data;
            set({ isLoading: false, data });
        }
        catch(error) {
            if(error instanceof AxiosError) {
                console.log(error.response?.data.detail)
                set({ 
                    isLoading: false, 
                    error: true, 
                    response: { 
                        title: error.response?.data?.title || 'Error',
                        message: error.response?.data.detail || 'An error occured' } 
                    });
            }
        }
    },
    deleteData: async (id, token) => {
        set({ isLoading: true });
        try{
            await axios.delete(`https://emergeton-api.onrender.com/api/v1/departments/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // for soft delete if there is.
            set((state) => ({
                isLoading: false,
                data: state.data?.filter((item) => item.id !== id),
                success: true,
                response: { title: 'Success', message: 'Record deleted successfully' }
            }))
            // set({ isLoading: false, data });

        }catch(error){
            if(error instanceof AxiosError){
                set({ 
                    isLoading: false, 
                    error: true, 
                    response: { 
                        title: error.response?.data?.title || 'Error',
                        message: error.response?.data.detail || 'An error occured' }
                });
            }
        }
    },
    addData: async (data, token) => {
        set({ isLoading: true, response: { title: '', message: '' } });

        const departmentData = {
            name: data.name,
            email: data.email,
            contact_number: data.contact_number,
            address: data.address,
            status: data.status,
            tags: data.tags
        }

        try{
            const response = await axios.post('https://emergeton-api.onrender.com/api/v1/departments/create', departmentData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const newData = response.data.data;

            set({ isLoading: false, success: true, response: { title: 'Success', message: 'Record added successfully' } });
            set((state) => ({
                data: [...state.data || [], newData]
            }))
            set({ response: { title: 'Success', message: 'Record added successfully' } });
        }catch(error){
            if(error instanceof AxiosError){
                set({ 
                    isLoading: false, 
                    error: true, 
                    response: { 
                        title: error.response?.data?.title || 'Error',
                        message: error.response?.data.message || 'There was an error.' }
                });
            }
        }
    }
}))