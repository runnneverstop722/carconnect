
import React, { useState } from 'react';
import { mockLogin } from '../services/mockAuthService.ts';
import { User, AuthProvider } from '../types.ts';
import { GoogleIcon, AppleIcon, XCircleIcon, MailIcon } from './icons.tsx';
import { APP_NAME } from '../constants.ts'; // Import APP_NAME

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (provider?: AuthProvider) => {
    setError(null);
    setIsLoading(true);
    try {
      let user;
      if (provider) {
        user = await mockLogin(undefined, undefined, provider);
      } else {
        if (!email || !password) {
          setError("Email and password are required.");
          setIsLoading(false);
          return;
        }
        user = await mockLogin(email, password);
      }
      onLoginSuccess(user);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[100]">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Login to {APP_NAME}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <XCircleIcon className="h-7 w-7" />
          </button>
        </div>

        {error && <p className="mb-4 text-red-400 bg-red-900/30 p-3 rounded-md text-sm">{error}</p>}
        
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email (mock: any email)</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password_mock" className="block text-sm font-medium text-gray-300">Password (mock: password123)</label>
            <input
              type="password"
              id="password_mock"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            {isLoading && !AuthProvider ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div> : <MailIcon className="h-5 w-5 mr-2" />}
            Login with Email
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <button
              onClick={() => handleLogin(AuthProvider.GOOGLE)}
              disabled={isLoading}
              className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              {isLoading && AuthProvider.GOOGLE ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div> : <GoogleIcon className="w-5 h-5 mr-2" />}
              Sign in with Google
            </button>
            <button
              onClick={() => handleLogin(AuthProvider.APPLE)}
              disabled={isLoading}
              className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              {isLoading && AuthProvider.APPLE ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div> : <AppleIcon className="w-5 h-5 mr-2" />}
              Sign in with Apple
            </button>
          </div>
        </div>
        <p className="mt-6 text-xs text-gray-500 text-center">
          Note: This is a mock authentication for demo purposes.
        </p>
      </div>
    </div>
  );
};

export default LoginModal;