
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const activeLinkClass = 'text-emerald-400';
  const inactiveLinkClass = 'text-white hover:text-emerald-300 transition-colors duration-300';

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-white tracking-tight">
              CMoney <span className="text-emerald-400">FitChallenge</span>
            </NavLink>
          </div>
          <nav className="hidden md:flex md:space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
            >
              Home
            </NavLink>
            <NavLink
              to="/ranking"
              className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
            >
              Rankings
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
