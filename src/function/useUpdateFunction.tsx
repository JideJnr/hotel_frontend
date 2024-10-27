import { useState } from "react";
import {
  doc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

interface UpdateData {
  [key: string]: any; // Allows flexibility for data fields
}

interface UseUpdateFunctionReturn {
  updatedData: UpdateData;
  setUpdatedData: React.Dispatch<React.SetStateAction<UpdateData>>;
  error: string | null;
  updateLoading: boolean;
  updateRecord: (dataToUpdate: UpdateData) => Promise<void>;
}

const useUpdateFunction = (updatePath: string): UseUpdateFunctionReturn => {
  const [updatedData, setUpdatedData] = useState<UpdateData>({});
  const [error, setError] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

  const updateRecord = async (dataToUpdate: UpdateData): Promise<void> => {
    if (!dataToUpdate) {
      setError("Input All Fields!!!");
      return;
    }

    try {
      setUpdateLoading(true);
      await updateDoc(doc(db, updatePath), dataToUpdate);

      setUpdatedData({});
      setError(null);
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
