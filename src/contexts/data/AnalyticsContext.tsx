import { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useAnalyticsStore } from '../../services/stores/analyticStore';

// Define proper types for Analytics data
interface AnalyticsOverview {
  sum: {
    totalSales: number;
    totalExpenses: number;
  };
  count: {
    customers: number;
    sales: number;
    expenses: number;
  };
  data: any; 
}

interface AnalyticsContextType {
  overview: AnalyticsOverview | null;
  loading: boolean;
  error: string | null;
  fetchOverview: (params?: {
    startDate?: string;
    endDate?: string;
    category?: string[];
  }) => Promise<Response>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [overview, setOverview] = useState<any | null>(null);
  const { loading, error, getOverviewData } = useAnalyticsStore();

  const wrappedFetchOverview = async (params?: {
    startDate?: string;
    endDate?: string;
    category?: string[];
  
  }): Promise<Response> => {
    try {
      const response = await getOverviewData(params);
  
      if (response?.success) {
        setOverview(response); 
      }
    
      if (!response) {
        throw new Error('No response from getOverviewData');
      }
      return response;
    } catch (err) {
      toast.error('Failed to fetch analytics overview');
      console.error('Fetch error:', err);
      throw err;
    }
  };

  const contextValue = useMemo(
    () => ({
      overview,
      loading,
      error,
      fetchOverview: wrappedFetchOverview,
    }),
    [overview, loading, error]
  );

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) throw new Error('useAnalytics must be used within an AnalyticsProvider');
  return context;
};
