import OnboardingTemplate from "../../../../components/templates/onboarding/onboarding"
import { useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/button/button";
import CustomSelect from "../../../../components/select/Select";

const SalesStepTwo = () => {
  const router = useIonRouter();

    const [formData, setFormData] = useState({
      customer: null,
      roomNumber: null,
      bookingInstruction: '',
      paymentType: null,
      paymentMethod: null,
      partPaymentAmount: '',
      price: ''
    });

    useEffect(() => {
      // Load core details from StepOne
      const saved = sessionStorage.getItem("coreDetails");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          price: parsed?.price || parsed?.roomNumber?.price || ''
        }));
      }
    }, []);
  
  return (
    <>
    </>
  );
};

export default SalesStepTwo;
