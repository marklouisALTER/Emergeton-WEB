import axios, { AxiosError } from 'axios';
import { create } from 'zustand';

type departmentStatusType = {
    deptId: string;
    setStatusToAvailable: (id: number, token: string) => void;
    status: 'success' | 'error' | 'idle';
    message: string;
}

export const useUpdateDeptStatus = create<departmentStatusType>((set) => ({
    deptId: '',
    status: 'idle',
    message: '',
    setStatusToAvailable: async (id: number, token: string) => {
        try{
            const response = await axios.patch(`https://emergeton-api.onrender.com/api/v1/departments/set-available/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            set({ status: 'success', message: response.data.message });
        }catch(error){
            if(error instanceof AxiosError){
                set({ status: 'error', message: error.response?.data.message });
            }
        }

    }
}));