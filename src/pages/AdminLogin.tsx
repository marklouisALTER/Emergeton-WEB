import React, { useState } from 'react'
import { FaPhoneVolume } from "react-icons/fa6";
import { PiUserCircleFill } from "react-icons/pi";
import { IoIosLock } from "react-icons/io";
import longosCityHall from '../assets/longos-city-hall.jpg'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import axios, { AxiosError } from 'axios';
import { useLoadingStore } from '@/store/useLoading';
import { Button } from 'antd';
import { Authentication } from '@/Authentication/Authenticate';

const AdminLogin:React.FC = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState<{ email: string, password: string }>({
    email: '',
    password: ''
  })
  const {isLoading, setLoading} = useLoadingStore();
  const { login } = Authentication();
  const location = useLocation();
  const from = location.state?.from || '/admin/dashboard';

  // useEffect(() => {
  //   location.state?.message && toast.error(location.state.message)
  // },[])

  const handleSubmit = async () => {
    setLoading(true)
    if(formData.email === '' || formData.password === '') {
      setLoading(false)
      return toast.error('Email and Password are required')
    }

    try{
      const request = await axios.post('https://emergeton-api.onrender.com/api/v1/auth/login', {
        email: formData.email,
        password: formData.password
      })

      if(request.status === 200) {

        // console.log('tangina mo pasok kaan')
        const token = request.data.data.token
        const user = `${request.data.data.first_name} ${request.data.data.last_name}`
        const id = request.data.data.id
        setLoading(false)
        login(user, token, id)
        // navigate('/admin/dashboard')
        navigate(from, {replace: true})
      }

    }catch(error) {
      if(error instanceof AxiosError) {
        setLoading(false)
        return toast.error(error.response?.data.message || 'An error occured')
      }
    }

  }
  

  return (
    <section className='relative w-full flex items-center justify-center h-screen px-5 bg-[#e8e8e8]'>
      <Toaster richColors position="top-center"/>
      
    <div className='w-[40rem] z-[99]'>
        <div className='flex flex-col items-center mb-10'>
          <div className='p-5 rounded-full border-4 border-black/80'>
            <FaPhoneVolume className='text-black/80 text-5xl' />
          </div>
          <h1 className='text-3xl font-extrabold mt-5 text-black/80 font-primary leading-4 tracking-widest'>EMERGTON</h1>
          <p className='text-lg text-black/60 mt-2 font-medium font-secondary'>EMERGENCY APP</p>
        </div>
        {location.state?.message &&
            <h3 className='font-secondary text-xl md:text-xl font-bold text-center text-red-500'>{location.state.message}</h3>
        }
        <div className='place-items-center mt-5 w-[90%] md:w-[80%] shadow-lg p-10 mx-auto bg-white rounded-3xl'>
            <div className='w-full flex flex-col gap-5'>
              <div className='relative w-full flex items-center bg-[#e8e8e8] rounded-full'>
                <div className='px-4 rounded-l-full'>
                  <PiUserCircleFill className='text-primary text-3xl'/>
                </div>
                <input 
                  type='text' 
                  placeholder='Email'
                  name='email' 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='w-full p-2 bg-[#e8e8e8] focus:outline-none rounded-r-full' 
                />
              </div>
              <div className='relative w-full flex items-center bg-[#e8e8e8] rounded-full'>
                <div className='px-4 rounded-l-full'>
                  <IoIosLock className='text-primary text-3xl'/>
                </div>
                <input 
                  type='password' 
                  placeholder='Password'
                  name='password' 
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className='w-full p-2 bg-[#e8e8e8] focus:outline-none rounded-r-full' 
                />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center px-2'>
                  <input type='checkbox' id='rememberMe' name='rememberMe' className='mr-2' />
                  <label htmlFor='rememberMe' className='font-secondary text-sm text-gray-500 cursor-pointer'>Remember me</label>
                </div>
                <p className='font-secondary text-sm text-primary'>Forgot Password?</p>
              </div>
              <Button 
                className='bg-primary text-white py-2 rounded-full mt-5'
                size='large' 
                onClick={handleSubmit}
                loading={isLoading}
              >
                  Login
              </Button>
            </div>
        </div>
    </div>
    <div className='absolute w-full h-[20rem] bg-primary bottom-0'></div>
    <img 
      src={longosCityHall} 
      alt="city hall" 
      className="absolute w-full object-cover opacity-10 backdrop:blur-3xl h-screen"
    />
</section>
  )
}

export default AdminLogin