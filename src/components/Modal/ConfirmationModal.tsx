import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import { useDispatchModalStore } from '@/store/Modal/useDispatchModal';
import { Label } from '../ui/label';
import { useDepartmentTable } from '@/store/Department/useDepartmentTable';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

export const ConfirmationModal: React.FC = () => {
    const { isOpen, closeModal, alertId } = useDispatchModalStore();
    const { data } = useDepartmentTable();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const token = sessionStorage.getItem('token')?.replace(/"/g, '');
    
    const handleResponse = async () => {
        if (selectedId === null) {
            toast.error('Please select a Department');
            return;
        }

        if (alertId === null) {
            toast.error('Please select an alert');
            return;
        }

        try {
            
            const response = await axios.post(
                'https://emergeton-api.onrender.com/api/v1/send-dispatch',
                {
                    department_id: selectedId,
                    alert_id: alertId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Check if the response was successful
            if (response.status === 200) {
                toast.success('Dispatch sent successfully');
                closeModal(); // Close modal on success
            } else {
                toast.error('Failed to send dispatch. Please try again.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while sending the dispatch');
        }
    };

    return (
        <Modal
            title='Deployment Type'
            open={isOpen}
            onOk={handleResponse}
            // loading={() => setTimeout(() => isLoading, 3000)}
            onCancel={() => closeModal()}
        >
            <Toaster position='top-center' />
            <Label className='mt-5 font-thin'>Select what kind of alert you want to create</Label>
            <Select
                onChange={(value) => setSelectedId(value)}
                className='w-full mt-3'
                placeholder="Select Department to deploy"
            >
                {data.map((item) => (
                    <Select.Option key={item.id} value={`${item.id}`}>
                        {item.name}
                        <span
                            className={`${
                                item.tags === 'police' ? 'bg-blue-700' : item.tags === 'fire' ? 'bg-red-700' : 'bg-green-700'
                            } text-white px-2 py-1 ml-2 rounded-md`}
                        >
                            {item.tags}
                        </span>
                    </Select.Option>
                ))}
            </Select>
        </Modal>
    );
};
