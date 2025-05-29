import { useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "../../firebase";

const useFetchData = (path: string, constraints: QueryConstraint[] = []) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const ref = collection(db, path);
        const q = query(ref, ...constraints);
        const querySnapshot = await getDocs(q);

        const fetchedData: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() });
        });

        setData(fetchedData);
      } catch (error) {
        console.error("Error getting documents:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path, constraints]);

  return { data, loading, error };
};

export default useFetchData;
