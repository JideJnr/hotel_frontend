import { useState } from "react";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

const useUpdateFunction = (updatePath) => {
  const [updatedData, setUpdatedData] = useState({});
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const navigate = useNavigate();
  const activitypath = "activitiesRecord";

  const updateRecord = async (dataToUpdate) => {
    if (!dataToUpdate) {
      setError("Input All Fields!!!");
      return;
    }

    try {
      setUpdateLoading(true);
      await updateDoc(doc(db, updatePath), dataToUpdate);
      await addDoc(collection(db, activitypath), {
        updatedData: dataToUpdate,
        details: "Updated Data",
        by: auth.currentUser.uid,
      });

      setUpdatedData({}); // Clearing updatedData state
      setError(null);
      navigate("/");
      window.location.reload(); // ReupdateLoading the window (optional)
    } catch (err) {
      console.error("Error during update operation:", err);
      setError("Error during update operation. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  return {
    updatedData,
    setUpdatedData,
    error,
    updateLoading,
    updateRecord,
  };
};

export default useUpdateFunction;
