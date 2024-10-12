import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar:React.FC = () => {
  return (
    <nav className='fixed w-full flex items-center justify-between p-5 bg-primary'>
        <h1 className='text-2xl font-bold text-white'>Emergency App</h1>
        <div className='flex items-center gap-5'>
            <NavLink
                to={'.'} 
                end
                className={({ isActive }) => isActive ? 
                'text-white font-secondary font-medium text-sm hover:text-white transition-all ease-in-out': 
                'text-[#B4CEFA] font-secondary font-medium text-sm hover:text-white transition-all ease-in-out'}>
                    Home
            </NavLink>
            <NavLink
                to={'contact-us'} 
                className={({ isActive }) => isActive ? 
                'text-white font-secondary font-medium text-sm hover:text-white transition-all ease-in-out': 
                'text-[#B4CEFA] font-secondary font-medium text-sm hover:text-white transition-all ease-in-out'}>
                    Contact Us
            </NavLink>
            <NavLink
                to={'about-us'} 
                className={({ isActive }) => isActive ? 
                'text-white font-secondary font-medium text-sm hover:text-white transition-all ease-in-out': 
                'text-[#B4CEFA] font-secondary font-medium text-sm hover:text-white transition-all ease-in-out'}>
                    About Us
            </NavLink>
        </div>
            <div className='flex items-center gap-5'>
              <NavLink
                  to={'register'} 
                  className={({ isActive }) => isActive ? 
                  'text-white font-secondary font-medium text-sm hover:text-white transition-all ease-in-out': 
                  'text-[#B4CEFA] font-secondary font-medium text-sm hover:text-white transition-all ease-in-out'}>
                      Register
              </NavLink>
              <NavLink 
                  to={'/login'} 
                  className={({ isActive }) => isActive ? 
                  'text-white font-secondary font-medium text-sm bg-primary/80 shadow-md border bg-white px-5 py-1 rounded-full': 
                  'text-primary font-secondary font-medium text-sm bg-white px-5 py-1 rounded-full border border-transparent hover:bg-primary/80 hover:text-white transition-all ease-in-out hover:border-white'}>
                  Login
              </NavLink>
            </div>
    </nav>
  )
}

export default Navbar