import { create } from 'zustand';
import { getOverview } from '../api/analyticApi';


interface AnalyticsStore {
  loading: boolean;
  error: string | null;
  getOverviewData: (params?: {
    startDate?: string;
    endDate?: string;
    category?: string[];
   
  }) => Promise<Response | undefined>;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  loading: false,
  error: null,

  getOverviewData: async (params:any) => {
    set({ loading: true, error: null });
    try {
      const response = await getOverview(params);
      set({ loading: false });
      return response;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Unknown error',
        loading: false,
      });
    }
  },
}));
