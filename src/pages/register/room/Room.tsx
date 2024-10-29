import { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { useDataContext } from "../../../context/dataContext";
import { getCurrentDate, getYearMonth } from "../../../function/getCurrentDate";
import { FormProps } from "../customer/StepOne";
import { toast } from "react-toastify";
import { getTodayDate } from "../../../utils/getTodaysDate";

const Room = ({ setFormData: setModal }: FormProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState<{
    customer:
      | { value: string | number | null; label: string | null }
      | undefined;
    roomNumber:
      | { value: string | number | null; label: string | null }
      | undefined;
    orderMethod: { value: string | null; label: string | null } | undefined;
    paymentMethod: { value: string | null; label: string | null } | undefined;
    bookingInstruction: string | undefined;
    price: string | undefined;
  }>({
    customer: undefined,
    roomNumber: undefined,
    orderMethod: undefined,
    paymentMethod: undefined,
    bookingInstruction: undefined,
    price: undefined,
  });

  const { user } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const recordPath = "roomRecord";
  const roomPath = `hotel/${user?.location}/rooms/${formData.roomNumber?.value}/roomHistory`;
  const activityPath = "activitiesRecord";
  const clientPath = `clientRecord/${formData.customer?.value}/lodgeHistory`;
  const { reloadData } = useDataContext();

  const handleSubmit = async () => {
    try {
      if (!formData.customer) throw new Error("Please select a client!");
      if (!formData.roomNumber) throw new Error("Please select a room!");
      if (!formData.orderMethod)
        throw new Error("Please select an order type!");
      if (!formData.paymentMethod)
        throw new Error("Please select a payment method!");

      setLoading(true);
      const todayDate = getTodayDate();

      const salesData = {
        customerId: formData.customer.value,
        customerName: formData.customer.label,
        room: formData.roomNumber.value,
        orderMethod: formData.orderMethod.value,
        hostID: user?.id,
        hostName: user?.name,
        location: user?.location,
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
        `hotel/${user?.location}/rooms/${formData.roomNumber.value}`,
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
    } catch (error) {
      console.error("Error submitting data: ", error.message);
      setError(error.message || "Error submitting data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      // Display the error message
      toast.error(error);

      // Clear the error after a delay (optional)
      const timer = setTimeout(() => {
        setError("");
      }, 5000); // Adjust the duration as needed (5000 ms = 5 seconds)

      // Cleanup timer on component unmount or when error changes
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className=" p-4 gap-4 flex flex-col">
      {isModalVisible ? (
        <StepTwo formData={formData} setFormData={setFormData} />
      ) : (
        <StepOne formData={formData} setFormData={setFormData} />
      )}

      <div className="flex ml-auto gap-4 mt-4">
        {isModalVisible ? (
          <Button
            text="Previous"
            className=" !bg-gray-400"
            onClick={() => {
              setModalVisible(false);
            }}
          />
        ) : (
          <Button
            text="Close"
            className=" !bg-gray-400"
            onClick={() => {
              setModal(false);
            }}
          />
        )}

        {isModalVisible ? (
          <Button
            text="Submit"
            className=""
            onClick={handleSubmit}
            loading={loading}
          />
        ) : (
          <Button
            text="Next"
            className=""
            onClick={() => {
              setModalVisible(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Room;
