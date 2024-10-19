import React from 'react'
import { FaPhoneVolume } from "react-icons/fa6";
import { PiUserCircleFill } from "react-icons/pi";
import { IoIosLock } from "react-icons/io";
import longosCityHall from '../assets/longos-city-hall.jpg'
import { useNavigate } from 'react-router-dom';

const AdminLogin:React.FC = () => {
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/admin/dashboard');
  }

  return (
    <section className='relative w-full flex items-center justify-center h-screen px-5 bg-[#e8e8e8]'>
    <div className='w-[40rem] z-[99]'>
        <div className='flex flex-col items-center mb-10'>
          <div className='p-5 rounded-full border-4 border-black/80'>
            <FaPhoneVolume className='text-black/80 text-5xl' />
          </div>
          <h1 className='text-3xl font-extrabold mt-5 text-black/80 font-primary leading-4 tracking-widest'>EMERGTON</h1>
          <p className='text-lg text-black/60 mt-2 font-medium font-secondary'>EMERGENCY APP</p>
        </div>
        <div className='place-items-center mt-5 w-[90%] md:w-[80%] shadow-lg p-10 mx-auto bg-white rounded-3xl'>
          <form>
            <div className='w-full flex flex-col gap-5'>
              <div className='relative w-full flex items-center bg-[#e8e8e8] rounded-full'>
                <div className='px-4 rounded-l-full'>
                  <PiUserCircleFill className='text-primary text-3xl'/>
                </div>
                <input 
                  type='text' 
                  placeholder='Email'
                  name='email' 
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
              <button className='bg-primary text-white py-2 rounded-full mt-5' onClick={handleSubmit}>Login</button>
            </div>
          </form>
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