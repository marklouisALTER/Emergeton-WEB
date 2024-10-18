import React from 'react'
import { MdOutlineWebAssetOff } from "react-icons/md";

export const NotFound:React.FC = () => {
  return (
    <section className='w-full h-screen flex flex-col items-center justify-center'>
      <h1 className='text-primary text-4xl font-bold font-primary'>404 ERROR</h1>
      <p className='text-black/60 text-lg font-secondary mt-2'>Page not found</p>
      <MdOutlineWebAssetOff className='text-primary text-9xl mt-5' />
      <p className='text-black/60 font-secondary text-sm mt-5'>Sorry, we couldn't find the page you're looking for.</p>

      <button className='bg-primary text-white py-2 px-5 rounded-full mt-10'>Go back</button>
    </section>
  )
}
