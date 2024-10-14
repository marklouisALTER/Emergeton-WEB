import { Link } from 'react-router-dom';
import { MOBILE_MENU } from '../../lib/dashboardlinks';

export default function UserMobileNav() {
    
  return (
    <nav className="fixed bottom-0 z-40 block w-full bg-primary px-5 py-3 text-white sm:hidden">
      <ul className="flex items-center justify-between">
        {MOBILE_MENU.map((m) => (
          <li
            key={m.key}
            className={`${m.key === 'dashboard' && 'text-green-500'} flex flex-col items-center gap-1`}
          >
            {m.icon}
            <Link
              to={m.path}
              className={`text-xs text-white ${m.label === 'Dashboard' && 'hover:text-green-500'}`}
            >
              {m.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
