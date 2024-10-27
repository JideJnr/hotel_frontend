import { useState } from "react";
import Button from "../../../components/button/button";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useDataContext } from "../../../context/dataContext";
import { FormProps } from "../customer/StepOne";
import useRoomScudOperation from "../../../services/useRoomScudOperation";

interface FormData {
  location: string; // Location of the hotel
  roomNumber: string; // Room number
  shortRestPrice?: number; // Optional short rest price
  lodgePrice?: number; // Optional lodge price
  id?: string; // Optional ID for updates and deletions
}

const CreateRoom = ({ setFormData: setModal, formData: data }: FormProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    location: "", // Initialize with empty string
    roomNumber: "", // Initialize with empty string
    shortRestPrice: undefined, // Optional field
    lodgePrice: undefined, // Optional field
  });

  const { reloadData } = useDataContext();
  const { createRoomProfile, loading, error } = useRoomScudOperation({
    formData,
  });

  const handleSubmit = async () => {
    try {
      const success = await createRoomProfile(); // Wait for success response
      if (success) {
        reloadData();
        setModal(false); // Close modal only if successful
      }
    } catch (err) {
      console.error("Error creating room:", err);
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
            className="!bg-blue-600" // Optional styling
            onClick={handleSubmit}
            loading={loading} // Disable while loading
          />
        ) : (
          <Button
            text="Next"
            className=""
            onClick={() => setModalVisible(true)}
          />
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display error message */}
    </div>
  );
};

export default CreateRoom;
