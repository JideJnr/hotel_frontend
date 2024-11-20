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
  getDoc,
  doc,
  where,
  QueryConstraint,
} from "firebase/firestore";
import { auth, db } from "../../firebase"; // Adjust the import according to your project structure
import { getTodayDate } from "../utils/getTodaysDate";

// Define interfaces for your state
interface Client {
  id: string;
  [key: string]: any;
}

interface Expense {
  id: string;
  [key: string]: any;
}

interface Room {
  id: string;
  [key: string]: any;
}

interface Record {
  id: string;
  [key: string]: any;
}

interface User {
  id: string;
  location: string;
  role: string;
  [key: string]: any;
}

interface DataContextProps {
  clients: Client[];
  expenses: Expense[];
  room: Room[];
  record: Record[];
  user: User | null;
  loading: boolean;
  error: Error | null;
  reloadData: () => Promise<void>;
}

interface DataProviderProps {
  children: ReactNode;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [room, setRoom] = useState<Room[]>([]);
  const [record, setRecord] = useState<Record[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const expensesPath = "expensesRecord";
  const clientsPath = "userRecord";
  const recordPath = "roomRecord";
  const todayDate = getTodayDate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          setLoading(true);
          const userDoc = await getDoc(doc(db, `userRecord/${currentUser.uid}`));
          if (userDoc.exists()) {
            setUser({ id: currentUser.uid, ...userDoc.data() } as User);
            await reloadData();
          } else {
            console.log("No user document found.");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const fetchData = async (
    path: string,
    setDataFunction: React.Dispatch<React.SetStateAction<any[]>>,
    constraints: QueryConstraint[] = []
  ) => {
    try {
      setLoading(true);
      setError(null);
      const ref = collection(db, path);
      const q = query(ref, ...constraints);
      const querySnapshot = await getDocs(q);

      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setDataFunction(data);
    } catch (error) {
      console.error("Error getting documents:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      const roomPath = `hotelRoom`;

      if (user.role !== "customer") {
        fetchData(clientsPath, setClients);
        fetchData(roomPath, setRoom);
      } else {
        setClients([]);
        setRoom([]);
      }
      if (user.role === "admin") {
        fetchData(recordPath, setRecord, [where("date", "==", todayDate)]);
        fetchData(expensesPath, setExpenses, [where("date", "==", todayDate)]);
      } else if (user.role === "manager") {
        fetchData(recordPath, setRecord, [
          where("hostID", "==", user.id),
          where("date", "==", todayDate),
        ]);
        fetchData(expensesPath, setExpenses, [
          where("hostID", "==", user.id),
          where("date", "==", todayDate),
        ]);
      } else if (user.role === "customer") {
        setRecord([]);
        setExpenses([]);
      }
    }
  }, [user, todayDate]);

  const reloadData = async () => {
    if (user) {
      setLoading(true);
      setError(null);

      if (user.role !== "customer") {
        await fetchData(clientsPath, setClients);
      }

      const roomPath = `hotelRooms`;
      await fetchData(roomPath, setRoom);

      await fetchData(recordPath, setRecord, [
        where("hostID", "==", user.id),
        where("date", "==", todayDate),
      ]);

      await fetchData(expensesPath, setExpenses, [
        where("hostID", "==", user.id),
        where("date", "==", todayDate),
      ]);

      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        clients,
        expenses,
        room,
        record,
        user,
        loading,
        error,
        reloadData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for accessing context
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

export default DataContext;
