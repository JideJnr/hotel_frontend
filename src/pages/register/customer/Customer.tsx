import { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import StepOne, { FormProps } from "./StepOne";
import StepTwo from "./StepTwo";
import { useDataContext } from "../../../context/dataContext";
import { getCurrentDate, getYearMonth } from "../../../function/getCurrentDate";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../../firebase";
import { toast } from "react-toastify";
import { useIonRouter } from "@ionic/react";

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
  const router = useIonRouter();
  const todayDate = getCurrentDate();
  const month = getYearMonth();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
  
    if (!formData.fullName || !formData.address || !formData.phone) {
      console.log("Input all fields!!!");
      return;
    }
  
    try {
      setLoading(true);
  
      const clientData = {
        name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        createdAt: Timestamp.fromDate(new Date()),
        hostID: user?.id || undefined,
        host: user?.fullName || undefined,
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
      toast.success("Profile created successfully!");
    } catch (err: any) {
      // Handle Firebase error
      console.error("Error during form submission:", err);
  
      if (err.code) {
        // Handle specific Firebase error codes
        switch (err.code) {
          case "permission-denied":
            toast.error("You don't have permission to perform this action.");
            break;
          case "already-exists":
            toast.error("A profile with this phone number already exists.");
            break;
          default:
            toast.error(`An error occurred: ${err.message}`);
        }
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
      setModal(false);
    }
  };
  

  const handleNext = () => {
    const errors = [];

    if (!formData.fullName) {
      errors.push("Full Name is required.");
    }
    if (!formData.phone) {
      errors.push("Phone is required.");
    }
    if (!formData.address) {
      errors.push("Address is required.");
    }

    if (errors.length > 0) {
      toast.error(errors.join(", ") );

    } else {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

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
          <Button text="Submit" className="" onClick={handleSubmit}  loading={loading} loadingText="Submitting..."/>
        ) : (
          <Button text="Next" className="" onClick={handleNext} />
        )}
      </div>
    </div>
  );
};

export default Customer;
