import { useState } from "react";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { getCurrentDate, getYearMonth } from "../function/getCurrentDate";
import { useDataContext } from "../context/dataContext";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { SimpleFormProps } from "../pages/register/customer/StepTwo";

const useCreateClientProfile = ({ formData }: SimpleFormProps) => {
  const { user } = useDataContext();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);

  const todayDate = getCurrentDate();
  const month = getYearMonth();

  const path = "userRecord";
  const activityPath = "activitiesRecord";

  const handleError = (message: string) => {
    setLoading(false);
    setError(message);
    toast.error(message); // Display error toast
  };

  const handleSignup = async (): Promise<boolean> => {
    setError(null);

    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setData(userCredential);
      return true; // Indicate success
    } catch (error: unknown) {
      const firebaseError = error as AuthError;
      handleError(firebaseError.message);
      return false;
    }
  };

  const createClientProfile = async (): Promise<boolean> => {
    setError(null);

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.address ||
      !formData.phone ||
      !formData.location
    ) {
      handleError("Please fill in all required fields.");
      return false;
    }

    if (!formData.id) {
      setError("Error Please Sign Up Again");
      
      return false;
    }

    try {
      setLoading(true);

      const clientData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        access: formData.password,
        location:formData.location.value,
        createdAt: Timestamp.fromDate(new Date()),
        date: todayDate,
        month: month,
        details: " User Created",
        status: "inactive",
        id: formData.id,
        role: "customer",
      };

      await setDoc(doc(db, path, formData.id), clientData);
      await addDoc(collection(db, activityPath), clientData);

      setError(null);
      toast.success("User profile created successfully!");
      return true; // Indicate success
    } catch (err) {
      console.error("Error during form submission:", err);
      setError("Error during form submission. Please try again.");
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    createClientProfile,
    handleSignup,
    data,
  };
};

export default useCreateClientProfile;
