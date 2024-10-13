import React from 'react'
export const Register:React.FC = () => {
  return (
    <section className='w-full flex items-center justify-center h-screen px-5 bg-[#e8e8e8] z-[-5]'>
        <div className='w-[40rem] p-5'>
            <div className='flex flex-col'>
                <h1 className='text-3xl font-extrabold text-black/80 font-primary'>Sign Up</h1>
                <p className='text-xs text-black/60 mt-2 font-medium font-secondary'>Here's where you can create an account</p>
            </div>
            <div className='mt-5 z-[999] w-[100%] md:w-[80%]'>
              <form>
                <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    className='w-full p-3 bg-white focus:outline-none rounded-full font-primary mt-5'
                />
                <input
                    type='text'
                    name='fullname'
                    placeholder='Full Name'
                    className='w-full p-3 bg-white focus:outline-none rounded-full mt-5 font-primary'
                />
                <input
                    type='text'
                    name='contact'
                    placeholder='Contact Number'
                    className='w-full p-3 bg-white focus:outline-none rounded-full mt-5 font-primary'
                />
                <input
                    type='text'
                    name='address'
                    placeholder='Address'
                    className='w-full p-3 bg-white focus:outline-none rounded-full mt-5 font-primary'
                />
                <input
                    type='text'
                    name='landmark'
                    placeholder='Landmark'
                    className='w-full p-3 bg-white focus:outline-none rounded-full mt-5 font-primary'
                />

                <button 
                    className='bg-primary text-white py-2 rounded-full mt-5 w-full hover:bg-primary/90 transition-all ease-in-out
                    font-primary font-bold text-lg focus:outline-none focus-ring-2 focus-ring-primary ring-offset-0 ring-offset-primary
                '>
                    CREATE ACCOUNT
                </button>
              </form>
            </div>
        </div>
    </section>
  )
}
