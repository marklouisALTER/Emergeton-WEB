import { Authentication } from '@/Authentication/Authenticate';
import { DepartmentModal } from '@/components/Modal/DepartmentModal'
import { DepartmentTable } from '@/components/Table/DepartmentTable'
import { useDepartmentTable } from '@/store/Department/useDepartmentTable';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
export const Department:React.FC = () => {
  
  const { getUser, getID, getToken, isAuthenticated } = Authentication();
  const { fetchData, response, error } = useDepartmentTable();
  const user = getUser();
  const  token = getToken()
  const userID = getID()
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(!isAuthenticated()){
        navigate('/', { state: { message: "You must login first", from: location.pathname } })
    }      

    fetchData(token)

    if(error) {
      toast.error(response.message)
    }
  },[user, token, userID, error])
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
