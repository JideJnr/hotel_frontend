import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useIonRouter } from '@ionic/react';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../services/stores/authStore';
import { setAuthToken, clearAuthToken } from '../../services/api';

interface User {
  uid: string;
  email: string;
  fullName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: any) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useIonRouter();
  const { login: storeLogin, logout: storeLogout, signup: storeSignup, loading, error } = useAuthStore();

  const [user, setUser] = useState<User | null>(() => {
    // initialize from localStorage if available
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleSuccessfulAuth = (response: any) => {
    const userData = {
      uid: response.user.uid,
      email: response.user.email,
      fullName: response.user.fullName,
      role: response.user.role,
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', response.token);
    setAuthToken(response.token);
  };

  const wrappedLogin = async (email: string, password: string) => {
    try {
      const response = await storeLogin(email, password);
      if (response.success) {
        handleSuccessfulAuth(response);
        router.push('/home', 'forward', 'replace');
      } else {
        toast.error(`Login failed: ${response.message}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('An unexpected error occurred during login.');
    }
  };

  const wrappedSignup = async (payload: any) => {
    try {
      const response = await storeSignup(payload);
      if (response.success) {
        handleSuccessfulAuth(response);
        router.push('/home', 'forward', 'replace');
      } else {
        toast.error(`Signup failed: ${response.message}`);
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast.error('An unexpected error occurred during signup.');
    }
  };

  const wrappedLogout = async () => {
    try {
      await storeLogout();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    clearAuthToken();
    router.push('/sign-in', 'forward', 'replace');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: wrappedLogin,
        signup: wrappedSignup,
        logout: wrappedLogout,
        isAuthenticated: !!user,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
