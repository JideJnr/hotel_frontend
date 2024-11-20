import { useState } from "react";
import Button from "../../../components/button/button";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useDataContext } from "../../../context/dataContext";
import { FormProps } from "../customer/StepOne";
import useRoomScudOperation from "../../../services/useRoomScudOperation";
import { toast } from "react-toastify";

interface FormData {
  location: string;
  roomNumber: string;
  shortRestPrice?: number;
  lodgePrice?: number;
  id?: string;
}

const CreateRoom = ({ setFormData: setModal, formData: data }: FormProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    location: "",
    roomNumber: "",
    shortRestPrice: undefined,
    lodgePrice: undefined,
  });

  const { reloadData } = useDataContext();
  const { createRoomProfile, loading, error } = useRoomScudOperation({
    formData,
  });

  
  const handleSubmit = async () => {
    try {
      const success = await createRoomProfile();
  
      if (success) {
        // Perform actions on successful room creation
        reloadData();
        setModal(false);
        toast.success("Room profile created successfully!");
      } else if (error) {
        // Handle errors explicitly if `useRoomScudOperation` exposes an `error` state
        console.error("Error from createRoomProfile:", error);
        toast.error(`Error: ${error.message || "Failed to create room profile."}`);
      } else {
        // Handle unexpected failure
        toast.error("Room profile creation failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Unexpected error creating room:", err);
  
      if (err.code) {
        // Handle specific Firebase or other backend error codes
        switch (err.code) {
          case "permission-denied":
            toast.error("You don't have permission to perform this action.");
            break;
          case "already-exists":
            toast.error("A room with the same profile already exists.");
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
  

  const handleNext = () => {
    const errors = [];

    if (!formData.location) {
      errors.push("Hotel Location is required.");
    }
    if (!formData.roomNumber) {
      errors.push("Room Number is required.");
    }
    if (!(formData.shortRestPrice || formData.lodgePrice)) {
      errors.push("Price is required.");
    }

    if (errors.length > 0) {
      console.log(errors.join(", "));
    } else {
      setModalVisible(true);
    }
  };

  return (
    <div className="p-4 gap-4 flex flex-col">
      {isModalVisible ? (
        <StepTwo formData={formData} setFormData={setFormData} />
      ) : (
        <StepOne formData={formData} setFormData={setFormData} />
      )}
      <div className="flex ml-auto gap-4 mt-4">
        {isModalVisible ? (
          <Button
            text="Previous"
            className="!bg-gray-400"
            onClick={() => setModalVisible(false)}
          />
        ) : (
          <Button
            text="Close"
            className="!bg-gray-400"
            onClick={() => setModal(false)}
          />
        )}

        {isModalVisible ? (
          <Button
            text="Submit"
            loadingText="Submitting..."
            onClick={handleSubmit}
            loading={loading}
          />
        ) : (
          <Button text="Next" onClick={handleNext} />
        )}
      </div>
    </div>
  );
};

export default CreateRoom;
