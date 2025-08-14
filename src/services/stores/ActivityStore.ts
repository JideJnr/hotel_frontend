import { create } from 'zustand';
import { fetchMyActivity } from '../api/ActivityApi';


interface ActivityStore {
  loading: boolean;
  error: string | null;
  getActivities: () => Promise<Response>;
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
  }
}));
