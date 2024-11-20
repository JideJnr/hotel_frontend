import { useState } from "react";
import { useDataContext } from "../context/dataContext";
import { getTodayDate } from "../utils/getTodaysDate";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

interface FormData {
  expenseType:
    | { value: string | number | null; label: string | null }
    | undefined;

  note: string | undefined;
  amount: string | undefined;
}

interface UseExpensesOperationProps {
  formData: FormData;
}
const useExpensesFormSubmit = ({ formData }: UseExpensesOperationProps) => {
  const { user } = useDataContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const expensesPath = "expensesRecord";
  const activityPath = "activitiesRecord";

  const { reloadData } = useDataContext();
  const todayDate = getTodayDate();

  const handleError = (message: string) => {
    setLoading(false);
    setError(message);
    toast.error(message); // Display error toast
  };

  const handleSubmit = async (): Promise<boolean> => {
    setError(null);

    if (!formData.expenseType || !formData.amount) {
      handleError("Please fill in all required fields.");
      return false;
    }

    try {
      setLoading(true);

      const salesData = {
        expenseType: formData.expenseType.value,
        hostID: user?.id || undefined,
        hostName: user?.fullName || undefined,
        time: serverTimestamp(),
        date: todayDate,
        details: "Ran Expenses",
        price: parseInt(formData.amount || "0", 10),
      };

      await addDoc(collection(db, expensesPath), salesData);
      await addDoc(collection(db, activityPath), salesData);

      await reloadData();

      return true;
    } catch (error) {
      handleError("Error during expenses submit. Please try again.");

      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    handleSubmit,
  };
};

export default useExpensesFormSubmit;
