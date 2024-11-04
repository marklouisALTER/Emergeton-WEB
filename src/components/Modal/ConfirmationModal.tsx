import React from 'react'
import { Modal } from 'antd'
import { useDispatchModalStore } from '@/store/Modal/useDispatchModal'

export const ConfirmationModal:React.FC = () => {

    const { isOpen, closeModal, alertId, departmentId } = useDispatchModalStore()

  return (
    <Modal
        title='Basic Modal'
        open={isOpen}    
        onOk={() => console.log(`Department id: ${departmentId}` , `Alert id: ${alertId}`)}
        onCancel={() => closeModal()}
    >
        Are you sure you want to delete this?

    </Modal>
    )
}
