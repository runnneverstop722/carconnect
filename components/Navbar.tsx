
import React from 'react';
import { User } from '../types';
import { APP_NAME } from '../constants';
import { UserCircleIcon, LogoutIcon } from './icons';

interface NavbarProps {
  currentUser: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, onLoginClick, onLogoutClick }) => {
  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" style={{ fontFamily: "'Titillium Web', sans-serif" }}>
              {APP_NAME}
            </span>
          </div>
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <UserCircleIcon className="h-7 w-7 text-gray-400" />
                <span className="text-gray-300 text-sm font-medium hidden sm:block">{currentUser.name}</span>
                <button
                  onClick={onLogoutClick}
                  className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition duration-150 ease-in-out"
                  aria-label="Logout"
                >
                  <LogoutIcon className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
