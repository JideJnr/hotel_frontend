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

interface Message {
  id: string;
  [key: string]: any;
}

interface Filter {
  field: string;
  operator: any;
  value: any;
}

interface MessagesContextType {
  messages: Message[];
  dataLoading: boolean;
  loadMoreMessages: () => void;
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
);

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [perPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<Filter | null>(null);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setDataLoading(true);
        const ref = collection(db, "messagesRecord");
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

        let activityData: Message[] = [];
        querySnapshot.forEach((doc) => {
          activityData.push({ id: doc.id, ...doc.data() });
        });

        // Update the last visible document
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastVisible(lastDoc);

        // Update messages state with new data
        setMessages((prevMessages) => [...prevMessages, ...activityData]);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchMessages();
  }, [page, filter]); // Trigger fetch when page or filter changes

  const loadMoreMessages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Reset messages when the filter is changed
  useEffect(() => {
    setMessages([]);
    setPage(1);
    setLastVisible(null);
  }, [filter]);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        dataLoading,
        loadMoreMessages,
        setFilter,
        setPage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = (): MessagesContextType => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within an MessageProvider");
  }
  return context;
};
