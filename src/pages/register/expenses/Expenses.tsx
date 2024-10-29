import { useState } from "react";
import Button from "../../../components/button/button";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { FormProps } from "../customer/StepOne";
import { useDataContext } from "../../../context/dataContext";
import { getTodayDate } from "../../../utils/getTodaysDate";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebase";

const Expenses = ({ setFormData: setModal }: FormProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState<{
    expenseType:
      | { value: string | number | null; label: string | null }
      | undefined;

    bookingInstruction: string | undefined;
    amount: string | undefined;
  }>({
    expenseType: undefined,
    bookingInstruction: undefined,
    amount: undefined,
  });

  const { user } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const expensesPath = "roomRecord";
  const activityPath = "activitiesRecord";

  const { reloadData } = useDataContext();
  const todayDate = getTodayDate();

  const handleSubmit = async () => {
    try {
      if (!formData.expenseType) throw new Error("Please select a client!");
      if (!formData.bookingInstruction)
        throw new Error("Please select a room!");
      if (!formData.amount) throw new Error("Please select an order type!");

      setLoading(true);

      const salesData = {
        expenseType: formData.expenseType.value,
        hostID: user?.id,
        hostName: user?.name,
        location: user?.location,
        time: serverTimestamp(),
        date: todayDate,
        details: "Ran Expenses",
        price: parseInt(formData.amount || "0", 10),
      };

      await addDoc(collection(db, expensesPath), salesData);

      await addDoc(collection(db, activityPath), salesData);

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
          />
        ) : (
          <Button text="Submit" className="" onClick={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default Expenses;
