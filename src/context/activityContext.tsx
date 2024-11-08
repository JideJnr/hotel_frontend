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
import { useDataContext } from "./dataContext";

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
  undefined,
);

interface ActivityProviderProps {
  children: ReactNode;
}


export const ActivityProvider: React.FC<ActivityProviderProps> = ({ children }) => {
  const { user } = useDataContext(); 
  const [activities, setActivities] = useState<Activity[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [perPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<Filter | null>(null);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setDataLoading(true);
        const ref = collection(db, "activitiesRecord");
        let q = query(ref);

        // Role-based filtering
        if (user?.role !== "admin") {
          q = query(q, where("id", "==", user?.id));
        } else if (filter) {
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
        const activityData: Activity[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setActivities((prevActivities) => [...prevActivities, ...activityData]);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchActivities();
  }, [page, filter, user]); // Include user to update based on role changes

  const loadMoreActivities = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
