import { Outlet } from 'react-router-dom';
import { NavLinks } from './NavLinks';

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl border-b border-slate-700/50 py-4">
        <NavLinks />
      </header>

      <div className="content-container">
        <Outlet />
      </div>
    </>
  );
}
