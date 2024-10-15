import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/SIdebar/Sidebar'
import UserMobileNav from '../components/Navbar/MobileNav'
import { DashboardNav } from '../components/Navbar/DashboardNav'

export const AdminLayout: React.FC= () => {
  return (
    <section className="dashboard-container">
      <Sidebar />
      <div>
        <DashboardNav />
        <main className="min-h-screen bg-gray-200 md:ml-[50px] lg:ml-[265px]">
          <Outlet />
        </main>
      </div>
      <UserMobileNav />
    </section>
  )
}
