import { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useActivityStore } from '../../services/stores/activityStore';



// Define a proper interface for your Activity type
interface Activity {
  id: string;
  // Add other activity properties here
  [key: string]: any;
}

interface ActivityContextType {
  activities: Activity[]; // Changed from singular 'activity' to plural 'activities' for clarity
  loading: boolean;
  error: string | null;
  fetchActivities: () => Promise<void>;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const { loading, error, getActivities } = useActivityStore();

  const wrappedFetchAllActivities = async () => {
    try {
      const response = await getActivities();
      if (response?.data) {
        setActivities(response.data); // Update local state with fetched activities
      }
    } catch (err) {
      toast.error('Failed to fetch activities');
      console.error('Fetch error:', err);
    }
  };

  const contextValue = useMemo(
    () => ({
      activities,
      loading,
      error,
      fetchActivities: wrappedFetchAllActivities,
    }),
    [activities, loading, error]
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