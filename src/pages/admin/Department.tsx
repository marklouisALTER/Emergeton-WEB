import { DepartmentModal } from '@/components/Modal/DepartmentModal'
import { DepartmentTable } from '@/components/Table/DepartmentTable'
import React from 'react'

export const Department:React.FC = () => {
  return (
    <section className='p-5 md:pl-5'>
      <div className='flex items-center justify-end py-5'>
        <DepartmentModal />
      </div>
      <DepartmentTable />
    </section>
  )
}
