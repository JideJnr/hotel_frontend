import { useState } from "react";
import Button from "../../../components/button/button";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useDataContext } from "../../../context/dataContext";
import { FormProps } from "../customer/StepOne";
import useRoomScudOperation from "../../../services/useRoomScudOperation";

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

  console.log(formData)
  const handleSubmit = async () => {
    try {
      const success = await createRoomProfile();
      if (success) {
        reloadData();
        setModal(false);
      }
    } catch (err) {
      console.error("Error creating room:", err);
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
            loadingText="Loading..."
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
