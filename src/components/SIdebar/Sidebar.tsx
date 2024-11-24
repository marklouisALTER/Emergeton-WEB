import React from 'react'
import { SIDEBAR_LINKS, SidebarLink } from '../../lib/dashboardlinks'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import TabletSidebar from './TabletSidebar'
import { Authentication } from "@/Authentication/Authenticate";
import { PiUserCircleFill } from "react-icons/pi";

const Sidebar:React.FC = () => {

  return (
    <>
    <TabletSidebar />
      <aside className="fixed z-30 hidden min-h-screen bg-primary shadow-lg lg:block">
        <nav className="flex h-dvh flex-col bg-custom-black shadow-sm">
          <div className="mb-8 flex items-center gap-2 p-4 pb-2 text-2xl">
            <div className='w-10 h-10 rounded-full bg-white'>
              <PiUserCircleFill className='text-primary'/>
            </div>
            <span className="text-2xl font-bold text-blue-100/30">Emergton</span>
          </div>

          <ul className="flex flex-1 flex-col gap-4 px-4 text-white w-[16rem]">
            {SIDEBAR_LINKS.map((el, i) => (
              <SidebarItems item={el} key={el.key} chevron={i < 2} />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}


export default Sidebar

type SidebarItemsProps = {
  item: SidebarLink;
  chevron: boolean;
};


export function SidebarItems({ item }: SidebarItemsProps) {

  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { logout } = Authentication();

  const isActive = () => {
    return item.path === path;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (item.key === 'logout') {
      e.preventDefault(); // Prevent navigation
      logout();
      navigate('..');
    }
  };
  return (
    <>
      <li
        className={`flex items-center justify-between cursor-pointer rounded-md px-2 py-3 duration-300  ${isActive() ? 'bg-blue-400/70' : 'text-gray-200/60 hover:bg-blue-400/70'} ${item.key === 'logout' && 'mb-3 mt-auto'}`}
      >
        <Link
          to={item?.path || ''}
          onClick={handleClick}
          className="flex font-medium w-40 items-center gap-2 hover:text-white"
        >
          {item.icon}
          {item.label}
        </Link>
      </li>
    </>
  );
}
