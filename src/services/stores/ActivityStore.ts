import { create } from 'zustand';
import { fetchMyActivity } from '../api/ActivityApi';

interface Activity {
  // Define activity properties based on your API response
  id: string;
  name: string;
  // ...other fields
}

interface ActivityStore {
  activity: Activity[];
  loading: boolean;
  error: string | null;
  getAvailableActivities: () => Promise<void>;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  activity: [],
  loading: false,
  error: null,

  getAvailableActivities: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchMyActivity();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch available activities');
      }
      set({ activity: response.activities || [], loading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', loading: false });
    }
  }
}));
