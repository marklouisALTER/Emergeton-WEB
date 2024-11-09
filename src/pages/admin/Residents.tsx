import { Authentication } from '@/Authentication/Authenticate';
import { ResidentTable } from '@/components/Table/ResidentTable'
import { useResidentsStore } from '@/store/Residents/useResidentsStore';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner'

export const Residents:React.FC = () => {

  const { getToken, isAuthenticated } = Authentication();
  const { fetchResidents, error, error_message } = useResidentsStore();
  const  token = getToken()
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
        navigate('/', { state: { message: "You must login first", from: location.pathname } });
    } else {
        fetchResidents(token);
    }
}, []);

useEffect(() => {
  if (error) {
      toast.error(error_message);
  }
}
, [error, error_message]);

  return (
    <section className='p-5 md:pl-5'>
    <Toaster richColors position="top-center"/>
    <div className='py-5'>
      <h1 className='text-xl font-primary text-primary font-semibold'>Residents</h1>
    </div>
    <ResidentTable />
  </section>
  )
}
