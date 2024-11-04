import { useIonRouter } from "@ionic/react";
import { useState, FormEvent } from "react";
import Button from "../../../components/button/button";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useDataContext } from "../../../context/dataContext";
import { getCurrentDate, getYearMonth } from "../../../function/getCurrentDate";
import { FormProps } from "../customer/StepOne";

const Book = ({ setFormData: setModal }: FormProps) => {
  const router = useIonRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    customer: undefined,
    roomNumber: undefined,
    orderMethod: undefined,
    paymentMethod: undefined,
    bookingInstruction: undefined,
    price: undefined,
  });

  const { user } = useDataContext();
  const todayDate = getCurrentDate();
  const month = getYearMonth();

  const handleNextClick = () => setCurrentStepIndex((prevStep) => prevStep + 1);

  const handleBackClick = () =>
    currentStepIndex > 1 && setCurrentStepIndex((prevStep) => prevStep - 1);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (!formData.customer) throw new Error("Please select a client!");
      if (!formData.roomNumber) throw new Error("Please select a room!");
      if (!formData.orderMethod)
        throw new Error("Please select an order type!");
      if (!formData.paymentMethod)
        throw new Error("Please select a payment method!");

      setLoading(true);

      const salesData = {
        customerId: formData.customer?.value,
        customerName: formData.customer?.label,
        room: formData.roomNumber?.value,
        order: formData.orderMethod?.value,
        hostID: user?.id,
        location: user?.location,
        method: formData.orderMethod?.value,
        date: todayDate,
        month: month,
        price: formData.price,
      };

      const recordPath = "roomRecord";
      const roomPath = `hotel/${user?.location}/rooms/${formData.roomNumber?.value}/roomHistory`;
      const activityPath = "activitiesRecord";
      const clientPath = `clientRecord/${formData.customer?.value}/lodgeHistory`;

      await addDoc(collection(db, recordPath), salesData);
      await addDoc(collection(db, roomPath), salesData);
      await addDoc(collection(db, clientPath), salesData);
      await addDoc(collection(db, activityPath), salesData);

      const roomDocRef = doc(
        db,
        `hotel/${user?.location}/rooms/${formData.roomNumber?.value}`,
      );
      const clientDocRef = doc(db, `clientRecord/${formData.customer?.value}`);
    } catch (error: any) {
      setError(error.message || "An error occurred during booking.");
    } finally {
      setLoading(false);
      router.push("/home");
    }
  };

  return (
    <div className="p-4 gap-4 flex flex-col">
      {currentStepIndex === 1 && (
        <StepOne formData={formData} setFormData={setFormData} />
      )}
      {currentStepIndex === 2 && (
        <StepTwo formData={formData} setFormData={setFormData} />
      )}
      {currentStepIndex === 3 && (
        <StepThree formData={formData} setFormData={setFormData} />
      )}

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex ml-auto gap-4 mt-4">
        {currentStepIndex !== 1 ? (
          <Button
            text="Previous"
            className="!bg-gray-400"
            onClick={handleBackClick}
          />
        ) : (
          <Button
            text="Close"
            className="!bg-gray-400"
            onClick={() => setModal(false)}
          />
        )}

        {currentStepIndex === 3 ? (
          <Button
            text="Submit"
            className=""
            onClick={handleSubmit}
            loading={loading}
          />
        ) : (
          <Button text="Next" className="" onClick={handleNextClick} />
        )}
      </div>
    </div>
  );
};

export default Book;
