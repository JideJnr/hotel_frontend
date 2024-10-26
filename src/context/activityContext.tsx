import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  startAfter,
  limit,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

interface Activity {
  id: string;
  [key: string]: any;
}

interface Filter {
  field: string;
  operator: any;
  value: any;
}

interface ActivitiesContextType {
  activities: Activity[];
  dataLoading: boolean;
  loadMoreActivities: () => void;
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined
);

interface ActivityProviderProps {
  children: ReactNode;
}

export const ActivityProvider: React.FC<ActivityProviderProps> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [perPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<Filter | null>(null);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setDataLoading(true);
        const ref = collection(db, "activitiesRecord");
        let q = query(ref);

        // Apply filter if any
        if (filter) {
          q = query(q, where(filter.field, filter.operator, filter.value));
        }

        // Order by date
        q = query(q, orderBy("date", "desc"));

        // Apply pagination
        if (lastVisible) {
          q = query(q, startAfter(lastVisible));
        }

        // Limit the results
        q = query(q, limit(perPage));

        const querySnapshot = await getDocs(q);

        let activityData: Activity[] = [];
        querySnapshot.forEach((doc) => {
          activityData.push({ id: doc.id, ...doc.data() });
        });

        // Update the last visible document
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastVisible(lastDoc);

        // Update activities state with new data
        setActivities((prevActivities) => [...prevActivities, ...activityData]);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchActivities();
  }, [page, filter]); // Trigger fetch when page or filter changes

  const loadMoreActivities = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Reset activities when the filter is changed
  useEffect(() => {
    setActivities([]);
    setPage(1);
    setLastVisible(null);
  }, [filter]);

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        dataLoading,
        loadMoreActivities,
        setFilter,
        setPage,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
};

export const useActivities = (): ActivitiesContextType => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error("useActivities must be used within an ActivityProvider");
  }
  return context;
};
