import { useState } from "react";
import Button from "../../../components/button/button";
import StepOne, { FormProps } from "./StepOne";
import StepTwo from "./StepTwo";
import { useDataContext } from "../../../context/dataContext";
import { getCurrentDate, getYearMonth } from "../../../function/getCurrentDate";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../../firebase";

const Customer = ({ setFormData: setModal }: FormProps) => {
  const { user } = useDataContext();

  const [formData, setFormData] = useState({
    fullName: undefined,
    phone: undefined,
    address: undefined,
    note: undefined,
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const path = "clientRecord";
  const activityPath = "activitiesRecord";

  const todayDate = getCurrentDate();
  const month = getYearMonth();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.fullName || !formData.address || !formData.phone) {
      setError("Input all fields!!!");
      return;
    }

    if (!user || !user.location) {
      setError("User location is required.");
      console.log("User location is undefined");
      return;
    }

    try {
      setLoading(true);

      const clientData = {
        name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        createdAt: Timestamp.fromDate(new Date()),
        location: user.location,
        hostID: user.id,
        host: `${user.firstName} ${user.lastName}`,
        date: todayDate,
        month: month,
        details: "Created User",
        status: "inactive",
      };

      // Store the client data
      await setDoc(doc(db, path, formData.phone), clientData);
      await addDoc(collection(db, activityPath), clientData);

      // Reset form data after submission
      setFormData({
        fullName: undefined,
        phone: undefined,
        address: undefined,
        note: undefined,
      });

      // Clear error state and notify success
      setError(null);
      window.alert("Profile created successfully!");
      window.location.reload(); // Only if you want a full reload
    } catch (err) {
      console.error("Error during form submission:", err);
      setError("Error during form submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleNext = () => {
    
    const errors = [];

    if (!formData.fullName) {
      errors.push('Full Name is required.');
    }
    if (!formData.phone) {
      errors.push('Phone is required.');
    }
    if (!formData.address) {
      errors.push('Address is required.');
    }
    

    if (errors.length > 0) {
      console.log(errors.join(', ')); 
    } else {
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
            onClick={handleNext}
          />
        )}
      </div>
    </div>
  );
};

export default Customer;
