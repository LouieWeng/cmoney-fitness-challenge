import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const gradientText = "bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-transparent bg-clip-text";
  const activeLinkClass = `${gradientText} font-bold`;
  const inactiveLinkClass = 'text-white hover:text-[#C4FF77] transition-colors duration-300';
  const mobileLinkClass = 'block py-2 px-4 text-sm rounded-md';

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-white tracking-tight">
              CMoney <span className={gradientText}>增肌減脂挑戰賽</span>
            </NavLink>
          </div>
          {/* Desktop Nav */}
          <nav className="hidden md:flex md:space-x-8">
            <NavLink
              to="/rules"
              className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
            >
              完整規則
            </NavLink>
            <NavLink
              to="/ranking"
              className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
            >
              每週賽況
            </NavLink>
          </nav>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              {/* Icon when menu is open */}
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Panel */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-700/50">
          <NavLink
            to="/rules"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => `${mobileLinkClass} text-center ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            完整規則
          </NavLink>
          <NavLink
            to="/ranking"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => `${mobileLinkClass} text-center ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            每週賽況
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;