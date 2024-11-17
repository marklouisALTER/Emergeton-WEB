import { Authentication } from '@/Authentication/Authenticate';
import { AlertModal } from '@/components/Modal/AlertModal';
import { ConfirmationModal } from '@/components/Modal/ConfirmationModal';
import { AlertHistoryTable } from '@/components/Table/AlertHistoryTable';
import { useAlertStore } from '@/store/Alerts/useStoreAlerts';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner'

export const AlertHistory:React.FC = () => {

    const { isAuthenticated, getToken } = Authentication();
    const navigate = useNavigate();
    const token = getToken();
    const location = useLocation();
    const { fetchAlert, status, message } = useAlertStore();
    useEffect(() => {
      if (!isAuthenticated()) {
          navigate('/', { state: { message: "You must login first", from: location.pathname } });
      }

      fetchAlert(token);

  }, []);

  useEffect(() => {
    if (status === 'success') {
      toast.success(message);
    }

    if (status === 'error') {
      toast.error(message);
    }
  }, [status, message]);
  

  return (
    <section className='p-5 md:pl-5'>
    <Toaster richColors position="top-center"/>
    <div className='py-5'>
      <h1 className='text-xl font-primary text-primary font-semibold'>Alert History logs</h1>
    </div>
    <AlertHistoryTable />
    <ConfirmationModal />
    <AlertModal />

  </section>
  )
}
