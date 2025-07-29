import { create } from 'zustand';
import * as api from '../api';



export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.login({ email, password });
      if (!response.success) {
        const errMsg = response.error || 'Login failed';
        set({ error: errMsg, loading: false, user: null });
        throw new Error(errMsg); 
      }
      set({ user: response.user, loading: false, error: null });
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
          uid: response.user.uid,
          email: response.user.email,
          fullName: response.user.fullName,
          role: response.user.role
        }));
      return response
    } catch (err: any) {
      const msg = err.message || 'Login failed';
      set({ error: msg, loading: false, user: null });
      throw new Error(msg); 
    }
  },
  
  logout: async () => {
    set({ loading: true });
    try {
      await api.logout();
      set({ user: null, loading: false });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (err: any) {
      set({ 
        error: err.message || 'Logout failed',
        loading: false 
      });
    }
  },
  
  signup: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await api.signup(payload);
  
      if (!response.success) {
        const errMsg = response.error || 'SignUp failed';
        set({ error: errMsg, loading: false, user: null });
        throw new Error(errMsg);
      }
  
      set({ user: response.user, loading: false, error: null });
      if (response.success) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify({
          uid: response.user.uid,
          email: response.user.email,
          fullName: response.user.fullName,
          role: response.user.role
        }));
              }
      return response
    } catch (err: any) {
      const msg = err.message || 'Login failed';
      set({ error: msg, loading: false, user: null });
      throw new Error(msg); 
    }
  },
  
}));