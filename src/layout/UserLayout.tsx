import React, { PropsWithChildren } from 'react'
import UserSidebar from '../components/SIdebar/UserSidebar'
import UserMobileNav from '../components/Navbar/UserMobileNav'
import { UserDashboardNav } from '../components/Navbar/UserDashboardNav'

export const UserLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <section className=" dashboard-container ">
      <UserSidebar />
      <div>
        <UserDashboardNav />
        <main className=" min-h-screen bg-gray-200 md:ml-[50px] md:p-4 lg:ml-[265px]">
          {children}
        </main>
      </div>
      <UserMobileNav />
    </section>
  )
}
