import { useState } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  location: string;
  roomNumber: string;
  shortRestPrice?: number;
  lodgePrice?: number;
  id?: string;
}

interface UseRoomScudOperationProps {
  formData: FormData;
}

const useRoomScudOperation = ({ formData }: UseRoomScudOperationProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const path = `hotel/${formData.location}/rooms/${formData.roomNumber}`;
  const activityPath = "activitiesRecord";

  const resetRoom = () => {
    setError(null);
    toast.dismiss(); // Dismiss previous toasts if needed
  };

  const handleError = (message: string) => {
    setLoading(false);
    setError(message);
    toast.error(message); // Display error toast
  };

  const createRoomProfile = async (): Promise<boolean> => {
    setError(null);

    if (!formData.location || !formData.roomNumber) {
      handleError("Please fill in all required fields.");
      return false;
    }

    try {
      setLoading(true);
      const roomData = {
        roomNumber: formData.roomNumber,
        location: formData.location,
        shortRest: formData.shortRestPrice || 0,
        lodge: formData.lodgePrice || 0,
        details: "Created Room Data",
        by: auth.currentUser?.uid,
        status: "Available",
      };

      await addDoc(collection(db, activityPath), roomData);
      await setDoc(doc(db, path), roomData);

      toast.success("Room profile created successfully!");
      resetRoom();
      return true; // Indicate success
    } catch (err) {
      console.error("Error during room creation:", err);
      handleError("Error during room creation. Please try again.");
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  const updateRoomProfile = async (updateData: FormData) => {
    setError(null);

    if (!updateData.location || !updateData.roomNumber || !updateData.id) {
      handleError("Please fill in all required fields.");
      return;
    }

    const updatePath = `hotel/${updateData.location}/rooms/${updateData.roomNumber}`;

    try {
      setLoading(true);
      await updateDoc(doc(db, updatePath), updateData);
      await addDoc(collection(db, activityPath), {
        roomNumber: updateData.roomNumber,
        location: updateData.location,
        details: "Updated Room Data",
        by: auth.currentUser?.uid,
      });

      toast.success("Room profile updated successfully!"); // Success toast
      resetRoom();
    } catch (err) {
      console.error("Error during update operation:", err);
      handleError("Error during room update. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteRoomProfile = async (deleteData: FormData) => {
    setError(null);

    if (!deleteData.location || !deleteData.roomNumber || !deleteData.id) {
      handleError("Please fill in all required fields.");
      return;
    }

    const deletePath = `hotel/${deleteData.location}/rooms/${deleteData.roomNumber}`;

    try {
      setLoading(true);
      await deleteDoc(doc(db, deletePath));
      await addDoc(collection(db, activityPath), {
        roomNumber: deleteData.roomNumber,
        location: deleteData.location,
        details: "Deleted Room Data",
        by: auth.currentUser?.uid,
      });

      toast.success("Room profile deleted successfully!"); // Success toast
      resetRoom();
    } catch (err) {
      console.error("Error during delete operation:", err);
      handleError("Error during room deletion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    createRoomProfile,
    updateRoomProfile,
    deleteRoomProfile,
  };
};

export default useRoomScudOperation;
