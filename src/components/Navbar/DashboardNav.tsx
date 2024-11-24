import React from 'react'

export const DashboardNav:React.FC = () => {
  const getName = sessionStorage.getItem('user') || 'User'
  const cleanName = getName.replace(/['"]+/g, '');

  const capitalized = cleanName
  .split(' ') 
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' '); 


  return (
   <section className='w-full flex items-center justify-end p-3'>
    <div className='text-primary cursor-pointer hover:bg-gray-300 p-2 rounded-md transition-all ease-in-out'>
      {/* <RiNotification3Fill className='text-2xl '/> */}
      Hello, {capitalized}
    </div>
   </section>
  )
}
