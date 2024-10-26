import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getCurrentDate, getYearMonth } from "../function/getCurrentDate";
import { db } from "../firebase";
import DataContext from "../context/dataContext";

const useSalesFormSubmit = (
  selected,
  selectedRoom,
  selectedType,
  selectedMethod,
  price,
) => {
  const { user } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const todayDate = getCurrentDate();
  const month = getYearMonth();
  const recordPath = "roomRecord";
  const roomPath = `hotel/${user?.location}/rooms/${selectedRoom?.roomNumber}/roomHistory`;
  const activityPath = "activitiesRecord";
  const clientPath = `clientRecord/${selected?.phone}/lodgeHistory`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!selected || !selected.name)
        throw new Error("Please select a client!");
      if (!selectedRoom || !selectedRoom.roomNumber)
        throw new Error("Please select a room!");
      if (!selectedType || !selectedType.name)
        throw new Error("Please select an order type!");
      if (!selectedMethod || !selectedMethod.name)
        throw new Error("Please select a payment method!");

      setLoading(true);

      const salesData = {
        clientName: selected.name,
        clientPhone: selected.phone,
        room: selectedRoom.roomNumber,
        order: selectedType.name,
        type: "Deluxe Room", // Adjust this based on your requirements
        host: user.name,
        hostID: user.id,
        location: user.location,
        method: selectedMethod.name,
        date: todayDate,
        month: month,
        status: "Active",
        details: "Sold Room",
        amount: parseInt(price, 10),
      };

      await addDoc(collection(db, recordPath), salesData);
      await addDoc(collection(db, roomPath), salesData);
      await addDoc(collection(db, clientPath), salesData);
      await addDoc(collection(db, activityPath), salesData);

      const roomDocRef = doc(
        db,
        `hotel/${user.location}/rooms/${selectedRoom.roomNumber}`,
      );
      const clientDocRef = doc(db, `clientRecord/${selected.phone}`);

      await updateDoc(roomDocRef, {
        status: "Active",
        currentGuest: {
          name: selected.name,
          phone: selected.phone,
        },
      });
      await updateDoc(clientDocRef, { status: "Active" });

      window.alert("Sales registered successfully!");

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

export default useSalesFormSubmit;
