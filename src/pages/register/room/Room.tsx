import { useState } from "react";
import Button from "../../../components/button/button";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { FormProps } from "../customer/StepOne";
import useSalesForm from "../../../services/UseSalesForm";
import { toast } from "react-toastify";

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

  const handleNext = () => {
    const errors = [];

    if (!formData.customer) {
      toast.error("Full Name is required.");
    }
    if (!formData.roomNumber) {
      toast.error("Room Number is required.");
    }
    if (!formData.orderMethod) {
      toast.error("Address is required.");
    }
    if (!formData.paymentMethod) {
      toast.error("Payment Method is required.");
    } else {
      setModalVisible(true);
    }
  };

  const { handleSubmit, loading } = useSalesForm({
    formData,
  });

  const submit = async () => {
    try {
      const success = await handleSubmit();

      if (success) {
        setModal(false);
      } else {
        // Handle case when `handleSubmit` returns a failure response
        toast.error("Submission failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Error creating room:", err);

      // Check for Firebase error codes or general error handling
      if (err.code) {
        switch (err.code) {
          case "permission-denied":
            toast.error("You don't have permission to perform this action.");
            break;
          case "already-exists":
            toast.error("A room with this information already exists.");
            break;
          default:
            toast.error(`An error occurred: ${err.message}`);
        }
      } else {
        // Fallback for unexpected errors
        toast.error("An unexpected error occurred. Please try again.");
      }
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
          <Button
            text="Submit"
            className=""
            onClick={submit}
            loading={loading}
          />
        ) : (
          <Button text="Next" className="" onClick={handleNext} />
        )}
      </div>
    </div>
  );
};

export default Room;
