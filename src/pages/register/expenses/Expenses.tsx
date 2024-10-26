import { useState } from "react";
import Button from "../../../components/button/button";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { FormProps } from "../customer/StepOne";

const Expenses = ({ setFormData: setModal }: FormProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState(false);

  
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

      const expensesData = {
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
        <StepTwo formData={formData} />
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
            text="Previous"
            className=" !bg-gray-400"
            onClick={() => {
              setModal(false);
            }}
          />
        )}
 {isModalVisible ? (
        <Button
          text="Next"
          className=""
          onClick={() => {
            setModalVisible(true);
          }}
        />):( <Button
          text="Submit"
          className=""
          onClick={handleSubmit}
        />)}
      </div>
    </div>
  );
};

export default Expenses;
