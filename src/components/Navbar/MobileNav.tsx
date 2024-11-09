import { Link, useLocation } from 'react-router-dom';
import { MOBILE_MENU } from '../../lib/dashboardlinks';

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 z-40 block w-full bg-primary px-5 py-3 text-white sm:hidden">
      <ul className="flex items-center justify-between">
        {MOBILE_MENU.map((m) => {
          const isActive = location.pathname === m.path;

          return (
            <li
              key={m.key}
              className={`flex flex-col items-center gap-1 ${
                isActive ? 'text-green-500' : 'text-white'
              }`}
            >
              {m.icon}
              <Link
                to={m.path}
                className={`text-xs ${isActive ? 'text-green-500' : 'hover:text-green-500'}`}
              >
                {m.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
