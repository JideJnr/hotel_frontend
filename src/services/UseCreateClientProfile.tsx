import { useState } from "react";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { getCurrentDate, getYearMonth } from "../function/getCurrentDate";
import { useIonRouter } from "@ionic/react";
import { useDataContext } from "../context/dataContext";
import { db } from "../../firebase";

const useCreateClientProfile = () => {
  const { user } = useDataContext();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const todayDate = getCurrentDate();
  const month = getYearMonth();
  const router = useIonRouter();

  const path = "clientRecord";
  const activityPath = "activitiesRecord";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !address || !phone) {
      setError("Input All Fields!!!");
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
        name: fullName,
        email,
        phone,
        address,
        createdAt: Timestamp.fromDate(new Date()),
        location: user.location,
        hostID: user.id,
        host: user.name,
        date: todayDate,
        month: month,
        details: "Created User",
        status: "inactive",
      };

      await setDoc(doc(db, path, phone), clientData);
      await addDoc(collection(db, activityPath), clientData);

      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setError(null);
      router.push("/");
    } catch (err) {
      console.error("Error during form submission:", err);
      setError("Error during form submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    error,
    loading,
    handleSubmit,
  };
};

export default useCreateClientProfile;
