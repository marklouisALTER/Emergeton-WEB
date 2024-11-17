import React, { useEffect } from 'react'
import { Tabs,ConfigProvider } from 'antd';
import type { TabsProps } from 'antd';
import { FiUser } from "react-icons/fi";
import { FaUserLock } from "react-icons/fa6";
import useResponsiveLayout from '@/lib/useResponsiveLayout';
import PersonalInformation from '@/components/Account-Settings/PersonalInformation';
import { ChangePassword } from '@/components/Account-Settings/ChangePassword';
import { useLocation, useNavigate } from 'react-router-dom';
import { Authentication } from '@/Authentication/Authenticate';
import { useAccountStore } from '@/store/Accounts/useAccountStore';
import { toast, Toaster } from 'sonner'

const Profile:React.FC = () => {

    const isMobile = useResponsiveLayout();
    const { getUser, getID, getToken, isAuthenticated } = Authentication();
    
    const user = getUser();
    const  token = getToken()
    const userID = getID()
    const navigate = useNavigate();
    const location = useLocation();
    const { fetchAccount, status, message } = useAccountStore();

    useEffect(() => {
      if(!isAuthenticated()){
          navigate('/', { state: { message: "You must login first", from: location.pathname } })
      }      

      fetchAccount(token)

    },[user, token, userID])

    useEffect(() => {
      if (status === 'success') {
        toast.success(message);
        useAccountStore.setState({ status: 'idle' });
      } else if (status === 'error') {
        toast.error(message);
        useAccountStore.setState({ status: 'idle' });
      }
    }, [status, message]);

  const items: TabsProps['items'] = [{
    key: '1',
    label: <p className='font-sans flex items-center gap-2 text-sm'><FiUser />Personal Information</p>,
    children: <PersonalInformation />
  },
  {
    key: '2',
    label: <p className='font-sans flex items-center gap-2 text-sm'><FaUserLock />Change Password</p>,
    children: <ChangePassword />
  },
]

  return (
    <ConfigProvider
    theme={{
      components: {
        Tabs: {
            itemColor: '#bbbdc1',
            itemHoverColor: '#3785cd',
            // itemActiveColor: '#1A42FF',
            itemActiveColor: '#3785cd',
        },
      },
    }}
  >
    <section className="p-5 bg-gray-200 flex justify-center"> 
      <Toaster richColors position='bottom-right' />
        <div className='w-[60rem]'>
            <h1 className='font-sans text-2xl font-semibold text-brand-secondary'>Account Settings</h1>
            <small className='text-gray-500'>Here's all the information about your account</small>
          
          <div className='mt-10'>
            <Tabs 
                items={items}
                defaultActiveKey="1"
                tabPosition={isMobile ? 'top' : 'left'}
                />
          </div>

        </div>
    </section>
  </ConfigProvider>
  )
}

export default Profile