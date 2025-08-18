import api from './index';

interface OverviewParams {
  startDate: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  category?: string[];
}

export const getOverview = async (params: OverviewParams) => {
  const res = await api.get('/analytics', { params });
  return res.data;
};
