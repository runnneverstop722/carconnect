
import React from 'react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {currentYear} {APP_NAME}. All rights reserved (sort of, it's an MVP!).
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Built with React, Tailwind CSS, and Gemini API.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
