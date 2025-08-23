import { create } from 'zustand';
import { clearFcmToken, login, signup, saveFcmToken } from '../api/authApi';
import { getFcmToken } from '../../utils/FirebaseNotification';

interface AuthState {
  loading: boolean;
  error: string | null;
  userId: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  signup: (payload: any) => Promise<any>;
  saveFcmToken: (payload: any) => Promise<any>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  loading: false,
  error: null,
  userId: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await login({ email, password });
      if (!response.success) {
        set({ error: response.message || 'Login failed' });
        return response;
      }

      const userId = response.user?.uid; // ✅ fixed
      set({ userId, loading: false });

      const fcmToken = await getFcmToken();
      if (userId && fcmToken) {
        await get().saveFcmToken({ userId, fcmToken });
      }

      return response;
    } catch (err: any) {
      const msg = err.message || 'Login failed';
      set({ error: msg });
      throw new Error(msg);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    const { userId } = get();
    if (!userId) return;

    set({ loading: true, error: null });
    try {
      await clearFcmToken({ userId });
      set({ userId: null });
    } catch (err: any) {
      set({ error: err.message || 'Logout failed' });
    } finally {
      set({ loading: false });
    }
  },

  signup: async (payload: any) => {
    set({ loading: true, error: null });
    try {
      const response = await signup(payload);
      if (!response.success) {
        set({ error: response.message || 'Signup failed' });
        return response;
      }

      const userId = response.user?.uid; // ✅ fixed
      set({ userId });

      const fcmToken = await getFcmToken();
      if (userId && fcmToken) {
        await get().saveFcmToken({ userId, fcmToken });
      }

      return response;
    } catch (err: any) {
      const msg = err.message || 'Signup failed';
      set({ error: msg });
      throw new Error(msg);
    } finally {
      set({ loading: false });
    }
  },

  saveFcmToken: async (payload: any) => {
    set({ loading: true, error: null });
    try {
      const response = await saveFcmToken(payload);
      if (!response.success) {
        set({ error: response.message || 'Token save failed' });
      }
      return response;
    } catch (err: any) {
      const msg = err.message || 'Token save failed';
      set({ error: msg });
      throw new Error(msg);
    } finally {
      set({ loading: false });
    }
  },
}));
