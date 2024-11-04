import { useState } from "react";
import Button from "../../../components/button/button";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { FormProps } from "../customer/StepOne";
import useExpensesFormSubmit from "../../../services/UseExpensesFormSubmit";
import { toast } from "react-toastify";

const Expenses = ({ setFormData: setModal }: FormProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState<{
    expenseType:
      | { value: string | number | null; label: string | null }
      | undefined;

    note: string | undefined;
    amount: string | undefined;
  }>({
    expenseType: undefined,
    note: undefined,
    amount: undefined,
  });

  const { handleSubmit, loading } = useExpensesFormSubmit({
    formData,
  });

  const submit = async () => {
    try {
      const success = await handleSubmit();
      if (success) {
        setModal(false);
      }
    } catch (err) {
      console.error("Error creating room:", err);
    }
  };

  const handleNext = () => {

    if (!formData.expenseType||!formData.amount) {
      toast.error("Please fill in all required fields.");
    }
 
   else {
      setModalVisible(true);
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
        {!isModalVisible ? (
          <Button text="Next" className="" onClick={handleNext} />
        ) : (
          <Button
            text="Submit"
            className=""
            onClick={submit}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default Expenses;
