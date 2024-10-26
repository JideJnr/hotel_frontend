import { useContext, useState } from "react";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import DataContext from "../context/dataContext";
import { db } from "../firebase";
import { getCurrentDate, getYearMonth } from "../function/getCurrentDate";

const useCreateStaffProfile = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [about, setAbout] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadImage = async (storage, phone, imgSrc) => {
    const imgRef = ref(storage, `staff/${phone}`);
    await uploadBytes(imgRef, imgSrc);
    return await getDownloadURL(imgRef);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgSrc(file);
    }
  };

  const todayDate = getCurrentDate();
  const month = getYearMonth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fName || !lName || !email || !address || !phone) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const storage = getStorage();

      let imgUrl = "";
      if (imgSrc) {
        imgUrl = await uploadImage(storage, phone, imgSrc);
      }

      const clientData = {
        staffName: fName + " " + lName,
        email,
        phone,
        about,
        imgSrc: imgUrl,
        fName,
        lName,
        pass,
        address,
        createdAt: Timestamp.fromDate(new Date()),
        location: state,
        date: todayDate,
        month: month,
        details: "Job Request",
        status: "Pending",
      };

      await setDoc(doc(db, "jobOffer", phone), clientData);
      await addDoc(collection(db, "activitiesRecord"), clientData);

      // Clear form fields only on successful submission

      setEmail("");
      setPhone("");
      setAddress("");
      setFName("");
      setLName("");
      setAbout("");
      setPass("");
      setImgSrc(null);
      setState("");
      setError(null);
      window.alert("Profile created successfully!");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Error during form submission:", err);
      setError("Error during form submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    setEmail,
    setAbout,
    setPass,
    setPhone,
    setAddress,
    setState,
    setFName,
    setLName,
    imgSrc,
    error,
    loading,
    handleSubmit,
    handleImageChange,
  };
};

export default useCreateStaffProfile;
