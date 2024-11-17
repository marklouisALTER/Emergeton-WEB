import { Modal, Select } from 'antd'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { useAlertModal } from '@/store/Alerts/useAlertModal'
import { useAlertStore } from '@/store/Alerts/useStoreAlerts'

export const AlertModal:React.FC = () => {

const [status, setStatus] = useState<string>('');
const { isOpen, id, closeModal } = useAlertModal();
const { changeAlertStatus } = useAlertStore();

const handleChangeSubmit = () => {  
    changeAlertStatus(id, status);
    
}

return (
    <Modal 
        title="Change Alert Status"
        open={isOpen}
        onOk={handleChangeSubmit}
        onCancel={closeModal}
        centered={true}
        >
            <Label className='text-sm font-thin mt-5'>Are you sure you want to change the alert status?</Label>
            <Select 
                style={{ width: '100%' }} 
                className='border border-gray-200 mt-2 rounded-md' 
                placeholder="Select Alert Status"
                onChange={(value) => setStatus(value)}
            >
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="ongoing">Ongoing</Select.Option>
                <Select.Option value="dismissed">Dismissed</Select.Option>
                <Select.Option value="done">Done</Select.Option>
            </Select>

        </Modal>

  )
}
