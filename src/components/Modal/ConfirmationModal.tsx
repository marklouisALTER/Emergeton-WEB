import React, { useState } from 'react';
import { Button, Modal, Select } from 'antd';
import { useDispatchModalStore } from '@/store/Modal/useDispatchModal';
import { Label } from '../ui/label';
import { useDepartmentTable } from '@/store/Department/useDepartmentTable';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useAlertStore } from '@/store/Alerts/useStoreAlerts';

export const ConfirmationModal: React.FC = () => {
    const { isOpen, closeModal, alertId, alert_type } = useDispatchModalStore();
    const { data } = useDepartmentTable();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const token = sessionStorage.getItem('token')?.replace(/"/g, '');
    const { fetchAlert } = useAlertStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleResponse = async () => {
        setIsLoading(true);
        if (selectedId === null) {
            toast.error('Please select a Department');
            setIsLoading(false);
            return;
        }

        if (alertId === null) {
            setIsLoading(false);
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
                setIsLoading(false);
                toast.success('Dispatch sent successfully');
                fetchAlert(`${token}`); 
                closeModal(); // Close modal on success
                return;
            } else {
                setIsLoading(false);
                toast.error('Failed to send dispatch. Please try again.');
                return;
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while sending the dispatch');
            setIsLoading(false);
            return;
        }
    };

    const filterAlert = data.filter((item) => item.tags === alert_type);

    return (
        <Modal
            title='Deployment Type'
            open={isOpen}
            cancelButtonProps={{ hidden: true }}
            okButtonProps={{ hidden: true }}
            // onOk={handleResponse}
            // onOk=''
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
                {filterAlert.map((item) => (
                    <Select.Option 
                        key={item.id} 
                        value={`${item.id}`}
                        disabled={item.status === 'dispatched'} 
                    >
                        {item.name}
                        <span
                            className={`${
                                item.tags === 'police' ? 'bg-blue-700' : item.tags === 'fire' ? 'bg-red-700' : 'bg-green-700'
                            } text-white px-2 py-1 ml-2 rounded-md font-medium`}
                        >
                            {item.tags === 'health' ? 'MEDICAL' : item.tags.toUpperCase()}
                        </span>
                    </Select.Option>
                ))}
            </Select>
            <div className='flex items-center justify-end mt-5'>
                <Button
                    onClick={handleResponse}
                    loading={isLoading}
                    className='bg-primary text-white px-5 py-2 rounded-md'
                >
                    Send Dispatch
                </Button>
                <Button
                    type='default'
                    color='danger'
                    onClick={() => closeModal()}
                    className='bg-red-600 text-white px-5 py-2 rounded-md ml-3'
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};
