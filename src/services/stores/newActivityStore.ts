import { create } from 'zustand';
import { fetchMyActivity, fetchStaffActivity } from '../api/activityApi';


interface ActivityStore {
  loading: boolean;
  error: string | null;
  getActivities: () => Promise<Response>;
  getStaffActivities: () => Promise<Response>;
}

export const useActivityStore = create<ActivityStore>((set) => ({

  loading: false,
  error: null,

  getActivities: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchMyActivity();
     set({ loading: false });
      return response;
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', loading: false });
    }
  },

  getStaffActivities: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchStaffActivity();
     set({ loading: false });
      return response;
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', loading: false });
    }
  }
}));
