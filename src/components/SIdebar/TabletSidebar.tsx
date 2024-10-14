import { NavLink } from "react-router-dom";
import { SIDEBAR_LINKS } from "../../lib/dashboardlinks";

export default function TabletSidebar() {
  return (
    <aside className="fixed z-50 hidden min-h-screen bg-primary sm:block lg:hidden">
      <nav className="flex h-dvh w-16 flex-col  p-4">
        <div className="mb-16 flex justify-center">
          <div className="relative">
            <div className="w-10 h-10 bg-white rounded-full"></div>
          </div>
        </div>

        <ul className="flex flex-1 flex-col items-center gap-4 text-white">
          {SIDEBAR_LINKS.map((el) => (
            <NavLink
              to={el?.path || ''}
              key={el.key}
              className={({ isActive }) =>
                isActive
                  ? ` bg-blue-400/80 p-4 rounded-md duration-300 text-white ${el.key === 'logout' && 'mb-3 mt-auto'}`
                  : `text-gray-200/60 hover:bg-blue-400/70 hover:text-white rounded-md p-4 duration-300 ${el.key === 'logout' && 'mb-3 mt-auto'}`
              }
            >
              {el.icon}
            </NavLink>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
