import { create } from 'zustand';
import { login, signup } from '../api/authApi';

interface AuthState {
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  signup: (payload: any) => Promise<any>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,

  

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await login({ email, password });
      set({ loading: false });
      if (!response.success) {
        set({ error: response.message || 'Login failed' });
      }
      return response;
    } catch (err: any) {
      const msg = err.message || 'Login failed';
      set({ error: msg, loading: false });
      
      throw new Error(msg);

    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      set({ loading: false });
    } catch (err: any) {
      set({
        error: err.message || 'Logout failed',
        loading: false,
      });
    }
  },

  signup: async (payload: any) => {
    set({ loading: true, error: null });
    try {
      const response = await signup(payload);
      set({ loading: false });
      if (!response.success) {
        set({ error: response.message || 'Login failed' });
      }
      return response;
    } catch (err: any) {
      const msg = err.message || 'Signup failed';
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },
}));
