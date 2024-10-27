
import { useState } from "react";
import Button from "../../../components/button/button";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useDataContext } from "../../../context/dataContext";
import { getCurrentDate, getYearMonth } from "../../../function/getCurrentDate";
import { FormProps } from "../customer/StepOne";

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

  const todayDate = getCurrentDate();
  const month = getYearMonth();
  const recordPath = "roomRecord";
  const roomPath = `hotel/${user?.location}/rooms/${formData.roomNumber?.value}/roomHistory`;
  const activityPath = "activitiesRecord";
  const clientPath = `clientRecord/${formData.customer?.value}/lodgeHistory`;
  const { reloadData } = useDataContext();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.customer) throw new Error("Please select a client!");
      if (!formData.roomNumber) throw new Error("Please select a room!");
      if (!formData.orderMethod)
        throw new Error("Please select an order type!");
      if (!formData.paymentMethod)
        throw new Error("Please select a payment method!");

      setLoading(true);

      const salesData = {
        customerId: formData.customer.value,
        customerName: formData.customer.label,
        room: formData.roomNumber.value,
        order: formData.orderMethod.value,
        hostID: user?.id,
        location: user?.location,
        method: formData.orderMethod.value,
        date: todayDate,
        month: month,
        status: "Active",
        details: "Sold Room",
        price: formData.price,
      };

      await addDoc(collection(db, recordPath), salesData);
      await addDoc(collection(db, roomPath), salesData);
      await addDoc(collection(db, clientPath), salesData);
      await addDoc(collection(db, activityPath), salesData);

      const roomDocRef = doc(
        db,
        `hotel/${user?.location}/rooms/${formData.roomNumber.value}`,
      );
      const clientDocRef = doc(db, `clientRecord/${formData.customer.value}`);

      await updateDoc(roomDocRef, {
        active: true,
        currentGuest: {
          name: formData.customer.label,
          id: formData.customer.value,
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
          <Button text="Submit" className="" onClick={handleSubmit} />
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
