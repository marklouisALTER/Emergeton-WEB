import { Authentication } from '@/Authentication/Authenticate';
import { DepartmentModal } from '@/components/Modal/DepartmentModal'
import { DepartmentTable } from '@/components/Table/DepartmentTable'
import { useDepartmentTable } from '@/store/Department/useDepartmentTable';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

export const Department:React.FC = () => {
  
  const { getToken, isAuthenticated } = Authentication();
  const { fetchData, response, request_status } = useDepartmentTable();
  const  token = getToken()
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
        navigate('/', { state: { message: "You must login first", from: location.pathname } });
    } else {
        fetchData(token);
    }
}, []); // Empty dependency array ensures it only runs once on mount

useEffect(() => {
    if (request_status === 'error') {
        toast.error(response.message)
    }
    if (request_status === 'success') {
        toast.success(response.message)
    }
},[request_status, response]);


  return (
    <section className='p-5 md:pl-5'>
      <Toaster richColors position="top-center"/>
      <div className='flex items-center justify-end py-5'>
        <DepartmentModal />
      </div>
      <DepartmentTable />
    </section>
  )
}
