import { MdSpaceDashboard } from "react-icons/md";
import { MdEmergencyShare } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { IoExit } from "react-icons/io5";

export type SidebarLink = {
    key: string;
    label: string;
    path?: string;
    icon: JSX.Element;
    subLinks?: {
      key: string;
      label: string;
      path: string;
      icon?: JSX.Element;
    }[];
  };

  export const SIDEBAR_LINKS: SidebarLink[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: <MdSpaceDashboard />
    },
    {
      key: 'department',
      label: 'Department',
      path: '/admin/department',
      icon: <MdEmergencyShare />,
    },
    {
      key: 'profile',
      label: 'Profile',
      path: '/admin/profile',
      icon: <FaUserAlt />,
    },
    {
      key: 'logout',
      label: 'Logout',
      path: '/logout',
      icon: <IoExit />,
    },
  ];
  
  export const MOBILE_MENU = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <MdSpaceDashboard size={20} />,
    },
    {
        key: 'department',
        label: 'Department',
        path: '/admin/department',
        icon: <MdEmergencyShare size={20} />,
    },
    {
        key: 'residents',
        label: 'Residents',
        path: '/admin/residents',
        icon: <FaUserAlt size={20} />,
    },
    {
        key: 'profile',
        label: 'Profile',
        path: '/admin/profile',
        icon: <FaUserAlt size={20} />,
    },
    {
        key: 'logout',
        label: 'Logout',
        path: '/logout',
        icon: <IoExit size={20} />,
    },
  ];
  