import React from 'react'
import Sidebar from '../components/SIdebar/Sidebar'
import { DashboardNav } from '../components/Navbar/DashboardNav'
import MobileNav from '../components/Navbar/MobileNav'
import { Outlet } from 'react-router-dom'

export const UserLayout: React.FC = () => {
  return (
    <section className=" dashboard-container ">
      <Sidebar />
      <div>
        <DashboardNav />
        <main className=" min-h-screen bg-gray-200 sm:ml-[50px] lg:ml-[265px]">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </section>
  )
}
