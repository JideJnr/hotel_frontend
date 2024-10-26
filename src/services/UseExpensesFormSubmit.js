import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { getCurrentDate, getYearMonth } from "../function/getCurrentDate";
import { db } from "../firebase";
import DataContext from "../context/dataContext";

const useExpensesFormSubmit = (
  selectedAmount,
  selectedDetail,
  selectedType,
) => {
  const { user } = useContext(DataContext);
  console.log(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const todayDate = getCurrentDate();
  const month = getYearMonth();
  const expensesPath = "expensesRecord";
  const activityPath = "activitiesRecord";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!selectedAmount || !selectedAmount.name)
        throw new Error("Please select an amount!");
      if (!selectedType || !selectedType.name)
        throw new Error("Please select an expense type!");

      setLoading(true);

      const expensesData = {
        type: selectedType.name,
        host: user.name,
        hostID: user.id,
        location: user.location,
        amount: parseInt(selectedAmount.name, 10),
        detail: selectedDetail || "N/A",
        date: todayDate,
        month: month,
        details: "Ran Expenses",
      };

      await addDoc(collection(db, expensesPath), expensesData);
      await addDoc(collection(db, activityPath), expensesData);
      window.alert("Expenses Registered successfully!");
      navigate("/");

      window.location.reload();
    } catch (err) {
      console.error("Error submitting data: ", err.message);
      setError(err.message || "Error submitting data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSubmit,
  };
};

export default useExpensesFormSubmit;
