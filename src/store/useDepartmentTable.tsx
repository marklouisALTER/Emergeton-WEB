import { create } from 'zustand';

type departmentType = {
    id: number;
    name: string;
    email: string;
    contact_number: string;
    address: string;
    status: string;
    tags: string;
    date_created: string;
}

type departmentTableProps = {
    data: departmentType[];
    setData: (data: departmentType[]) => void;
}

export const useDepartmentTable = create<departmentTableProps>((set) => ({
    data: [
        {
            id: 1,
            name: 'Police Department',
            email: 'police.longos@gmail.com',
            contact_number: '09123456789',
            address: 'Longos, Malabon City',
            status: 'Active',
            tags: 'Police, Department',
            date_created: '2021-08-01',
        }
    ],
    setData: (data) => set({ data })
}))