import {
  collection,
  query,
  getDocs,
  where,
  QueryConstraint,
} from "firebase/firestore";

// Helper function to format Date to 'YYYY-MM-DD'
export function formatDateToYMD(date: Date) {
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

export const fetchData = async (
  db: any,
  path: string,
  setDataFunction?: React.Dispatch<React.SetStateAction<any[]>>,
  constraints: QueryConstraint[] = [],
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  setError?: React.Dispatch<React.SetStateAction<Error | null>>,
  startDate?: Date,
  endDate?: Date,
) => {
  try {
    if (setLoading) setLoading(true);
    if (setError) setError(null);

    const ref = collection(db, path);

    // Use the formatDateToYMD function to format the dates
    const formattedStartDate = startDate
      ? formatDateToYMD(startDate)
      : undefined;
    const formattedEndDate = endDate ? formatDateToYMD(endDate) : undefined;

    const dateConstraints = [];
    if (formattedStartDate)
      dateConstraints.push(where("date", ">=", formattedStartDate));
    if (formattedEndDate)
      dateConstraints.push(where("date", "<=", formattedEndDate));

    const q = query(ref, ...constraints, ...dateConstraints);
    const querySnapshot = await getDocs(q);

    const data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    if (setDataFunction) {
      setDataFunction(data);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error getting documents:", error);
    if (setError) setError(error as Error);
    return [];
  } finally {
    if (setLoading) setLoading(false);
  }
};
