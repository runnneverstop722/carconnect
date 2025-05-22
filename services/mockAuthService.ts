
import { User, AuthProvider } from '../types';

// This is a MOCK authentication service.
// In a real application, this would interact with a secure backend.

export const mockLogin = async (email?: string, password?: string, provider?: AuthProvider): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (provider === AuthProvider.GOOGLE) {
    return { id: 'mockGoogleUser', name: 'Google User', email: 'googleuser@example.com' };
  }
  if (provider === AuthProvider.APPLE) {
    return { id: 'mockAppleUser', name: 'Apple User', email: 'appleuser@example.com' };
  }
  
  // Basic email/password validation for mock purposes
  if (email && password) {
    if (password === 'password123') { // Super secure password ;)
      return { id: 'mockUser123', name: email.split('@')[0] || 'Mock User', email };
    } else {
      throw new Error('Invalid credentials (mock error)');
    }
  }
  throw new Error('Login failed (mock error)');
};

export const mockLogout = async (): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  // In a real app, this would invalidate tokens, clear session, etc.
  return;
};
