import { useState } from "react";
import { useDataContext } from "../context/dataContext";
import { getTodayDate } from "../utils/getTodaysDate";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

interface FormData {
  customer: { value: string | number | null; label: string | null } | undefined;
  roomNumber:
    | { value: string | number | null; label: string | null }
    | undefined;
  orderMethod: { value: string | null; label: string | null } | undefined;
  paymentMethod: { value: string | null; label: string | null } | undefined;
  bookingInstruction: string | undefined;
  price: string | undefined;
}

interface UseSalesOperationProps {
  formData: FormData;
}
const useSalesForm = ({ formData }: UseSalesOperationProps) => {
  const { user } = useDataContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const recordPath = "roomRecord";
  const roomPath = `hotelRooms/${formData.roomNumber?.value}/roomHistory`;
  const activityPath = "activitiesRecord";
  const clientPath = `clientRecord/${formData.customer?.value}/lodgeHistory`;
  const { reloadData } = useDataContext();

  const handleError = (message: string) => {
    setLoading(false);
    setError(message);
    toast.error(message); // Display error toast
  };

  const handleSubmit = async (): Promise<boolean> => {
    setError(null);

    if (
      !formData.customer ||
      !formData.roomNumber ||
      !formData.orderMethod ||
      !formData.paymentMethod
    ) {
      handleError("Please fill in all required fields.");
      return false;
    }

    try {
      setLoading(true);
      const todayDate = getTodayDate();

      const salesData = {
        customerId: formData.customer.value,
        customerName: formData.customer.label,
        room: formData.roomNumber.value,
        orderMethod: formData.orderMethod.value,
        hostID: user?.id,
        hostName: user?.fullName,
        paymentMethod: formData.paymentMethod.value,
        time: serverTimestamp(),
        date: todayDate,
        status: "active",
        details: "Sold Room",
        price: parseInt(formData.price || "0", 10),
      };


      const docRef = await addDoc(collection(db, recordPath), salesData);

      const docId = docRef.id;

      await addDoc(collection(db, roomPath), salesData);
      await addDoc(collection(db, clientPath), salesData);
      await addDoc(collection(db, activityPath), salesData);

      const roomDocRef = doc(
        db,
        `hotelRooms/${formData.roomNumber.value}`,
      );
      const clientDocRef = doc(db, `clientRecord/${formData.customer.value}`);

    
      await updateDoc(roomDocRef, {
        status: "active",
        currentGuest: {
          name: formData.customer.label,
          id: formData.customer.value,
          docId: docId,
        },
      });
      await updateDoc(clientDocRef, { status: "Active" });
      await reloadData();
      return true; // Indicate success
    } catch (error) {
      handleError("Error during sales submit. Please try again.");

      return false; // Indicate failure
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

export default useSalesForm;
