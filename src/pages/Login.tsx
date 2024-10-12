import React from 'react'

export const Login:React.FC = () => {
  return (
    <section className='w-full flex items-center justify-center h-screen px-5'>
        <div className='w-[40rem] h-[30rem]'>
            <div className='flex flex-col'>
                <h1 className='text-black/80 font-bold text-2xl'>Create an Account</h1>
                <p className='text-black/60 font-secondary text-xs'>Here's where you can create an account to access the dashboard</p>
            </div>
        </div>
    </section>
  )
}
