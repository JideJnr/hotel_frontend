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

interface ActivitiesContextType {
  activities: Activity[];
  dataLoading: boolean;
  loadMoreActivities: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined,
);

interface ActivityProviderProps {
  children: ReactNode;
}

export const ActivityProvider: React.FC<ActivityProviderProps> = ({
  children,
}) => {
  const { user } = useDataContext();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [perPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        if (!user) {
          return;
        }
        setDataLoading(true);
        const ref = collection(db, "activitiesRecord");
        let q = query(ref);

        if (user && user?.role !== "admin") {
          q = query(q, where("id", "==", user?.id));
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
  }, [page, user]);

  const loadMoreActivities = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    setActivities([]);
    setPage(1);
    setLastVisible(null);
  }, []);

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        dataLoading,
        loadMoreActivities,
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
