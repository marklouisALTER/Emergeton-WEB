"use client";

import { LuDot } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";


interface Props {
  href: string;
  link: string;
  className?: string;
}
const DashboardSubLink = ({ href, link, className }: Props) => {
    const { pathname } = useLocation();

    const isActive = pathname === href;
    function isActiveChecker() {
        return isActive ? "text-green-500" : "";
    }
  return (
    <Link
      to={href}
      className={
        className +
        `${isActiveChecker()} i px-5 mt-2 flex items-center rounded-md pl-4 text-sm hover:bg-green-500/80 hover:text-white group`
      }
    >
      <LuDot size={45} />
      <span className="text-white group-hover:text-white">{link}</span>
    </Link>
  );
};

export default DashboardSubLink;
