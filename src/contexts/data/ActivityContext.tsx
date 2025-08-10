import { createContext, useContext, ReactNode, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useActivityStore } from '../../services/stores/ActivityStore';

interface ActivityContextType {
  activity: any[]; // Replace `any` with your Activity type
  loading: boolean;
  error: string | null;
  fetchActivities: () => Promise<void>;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activity, loading, error, getAvailableActivities } = useActivityStore();

  const wrappedFetchAllActivities = async () => {
    try {
      await getAvailableActivities();
    } catch (err) {
      toast.error('Failed to fetch activities');
      console.error('Fetch error:', err);
    }
  };

  const contextValue = useMemo(
    () => ({
      activity,
      loading,
      error,
      fetchActivities: wrappedFetchAllActivities,
    }),
    [activity, loading, error]
  );

  return (
    <ActivityContext.Provider value={contextValue}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) throw new Error('useActivity must be used within an ActivityProvider');
  return context;
};
