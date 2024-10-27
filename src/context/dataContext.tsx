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
import { getCurrentDate } from "../function/getCurrentDate";

// Define interfaces for your state
interface Client {
  id: string;
  [key: string]: any; // More specific fields for clients can be defined here
}

interface Expense {
  id: string;
  [key: string]: any; // More specific fields for expenses can be defined here
}

interface Room {
  id: string;
  [key: string]: any; // More specific fields for room can be defined here
}

interface Record {
  id: string;
  [key: string]: any; // More specific fields for records can be defined here
}

interface User {
  id: string;
  location: string;
  [key: string]: any; // More specific fields for user can be defined here
}

interface DataContextProps {
  clients: Client[];
  expenses: Expense[];
  room: Room[];
  record: Record[];
  user: User | null;
  loading: boolean;
  error: Error | null;
  reloadData: () => Promise<void>; // Add this line
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

  const uid = auth.currentUser?.uid;
  const expensesPath = "expensesRecord";
  const clientsPath = "clientRecord";
  const recordPath = "roomRecord";
  const roomPath = user ? `hotel/${user.location}/rooms` : null;
  const todayDate = getCurrentDate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (uid) {
        try {
          setLoading(true);
          const docSnap = await getDoc(doc(db, `staff/${uid}`));
          if (docSnap.exists()) {
            setUser(docSnap.data() as User);
          } else {
            console.log("No such user document!");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [uid]);

  const fetchData = async (
    path: string,
    setDataFunction: React.Dispatch<React.SetStateAction<any[]>>,
    constraints: QueryConstraint[] = [],
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
      console.error("Error getting documents: ", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uid && user) {
      if (user.id) {
        fetchData(clientsPath, setClients);
      } else {
        console.log("User ID is not defined.");
      }

      if (roomPath) {
        fetchData(roomPath, setRoom);
      }

      if (user.role === "admin") {
        fetchData(recordPath, setRecord, [where("date", "==", todayDate)]);
      } else {
        fetchData(recordPath, setRecord, [
          where("hostID", "==", user.id),
          where("date", "==", todayDate),
        ]);
      }

      if (user.role === "admin") {
        fetchData(expensesPath, setExpenses, [where("date", "==", todayDate)]);
      } else {
        fetchData(expensesPath, setExpenses, [
          where("hostID", "==", user.id),
          where("date", "==", todayDate),
        ]);
      }
    }
  }, [uid, user, roomPath, todayDate]);

  const reloadData = async () => {
    if (uid && user) {
      setLoading(true); // Optional: Indicate loading state
      setError(null); // Reset any previous errors

      if (user.id) {
        await fetchData(clientsPath, setClients);
      }

      if (roomPath) {
        await fetchData(roomPath, setRoom);
      }

      await fetchData(recordPath, setRecord, [
        where("hostID", "==", user.id),
        where("date", "==", todayDate),
      ]);

      await fetchData(expensesPath, setExpenses, [
        where("hostID", "==", user.id),
        where("date", "==", todayDate),
      ]);

      setLoading(false); // Reset loading state after fetching data
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
