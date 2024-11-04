import { useState } from "react";
import { FormProps } from "../register/customer/StepOne";
import { useDataContext } from "../../context/dataContext";
import { getTodayDate } from "../../utils/getTodaysDate";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import StepTwo from "./StepTwo";
import StepOne from "./StepOne";
import Button from "../../components/button/button";

const Funding = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState<{
    photoUrl: string | undefined;
    userId: string | undefined;
  }>({
    photoUrl: undefined,
    userId: undefined,
  });

  const { user } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const expensesPath = "fundingData";
  const activityPath = "activitiesRecord";

  const { reloadData } = useDataContext();
  const todayDate = getTodayDate();

  const handleSubmit = async () => {
    try {
      if (!formData.photoUrl) throw new Error("Please the payment receipt");

      setLoading(true);

      const fundingData = {
        image: formData.photoUrl,
        fundingAccount: formData.userId,
        approved: false,
      };

      await addDoc(collection(db, expensesPath), fundingData);
      await addDoc(collection(db, activityPath), fundingData);

      await reloadData();
    } catch (error) {
      console.error("Error submitting data: ", error.message);
      setError(error.message || "Error submitting data. Please try again.");
    } finally {
      setLoading(false);
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
          <></>
        )}
        {isModalVisible ? (
          <Button
            text="Next"
            className=""
            onClick={() => {
              setModalVisible(true);
            }}
          />
        ) : (
          <Button text="Submit" className="" onClick={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default Funding;
