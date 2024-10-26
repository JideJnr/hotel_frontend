import { useState, useEffect } from "react";
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const useFetchCollection = (path) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const dataRef = collection(db, path);
        const q = query(dataRef);
        const querySnapshot = await getDocs(q);

        let fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });

        setData(fetchedData);
      } catch (error) {
        console.error("Error getting documents: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { loading, data };
};

const fetchData = async (path) => {
  const result = {
    loading: true,
    data: null,
    error: null,
  };

  try {
    const docRef = doc(db, path);
    const docSnap = await getDoc(docRef);
    console.log(path);
    if (docSnap.exists()) {
      result.data = docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    result.error = error;
  } finally {
    result.loading = false;
  }

  return result;
};

export { useFetchCollection, fetchData };
