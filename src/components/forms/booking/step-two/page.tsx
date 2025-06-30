import OnboardingTemplate from "../../../../components/templates/onboarding/onboarding"
import { useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/button/button";
import CustomSelect from "../../../../components/select/Select";

const SalesStepTwo = () => {
  const router = useIonRouter();

  // Payment types and methods
  const type = [
    { value: "fullPayment", label: "Full Payment" },
    { value: "partPayment", label: "Part Payment" },
  ];

  const paymentOptions = [
    { value: "cash", label: "Cash" },
    { value: "transfer", label: "Bank Transfer" },
    { value: "pos", label: "POS" },
  ];

  const [formData, setFormData] = useState({
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

  const handleSelectChange = (
    name: string,
    option: { value: string | number | null; label: string | null } | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        value: option?.value || null,
        label: option?.label || null,
      },
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    const errors = {};
    if (!formData.paymentType?.value) {
      toast.error("Please select a payment type.");
      return;
    }
    if (!formData.paymentMethod?.value) {
      toast.error("Please select a payment method.");
      return;
    }
    if (
      formData.paymentType?.value === "partPayment" &&
      !formData.partPaymentAmount
    ) {
      toast.error("Please enter amount for part payment.");
      return;
    }

    sessionStorage.setItem("coreDetails", JSON.stringify(formData));
    router.push("/auth/step-three", "forward", "replace");
  };

  return (
    <OnboardingTemplate titleOne="Create your account">
      <div className="flex flex-col gap-4 bg-white h-fit p-4">
        <p>Price</p>
        <p>{formData.price || "-"}</p>

        <p>Select Payment Type</p>
        <CustomSelect
          name="paymentType"
          options={type}
          onChange={(option) => handleSelectChange("paymentType", option)}
          value={formData.paymentType?.value || null}
          placeholder="Select Payment Type"
        />

        {formData.paymentType?.value === "partPayment" && (
          <>
            <p>Amount</p>
            <textarea
              name="partPaymentAmount"
              className="border rounded-md h-[100px] p-2"
              placeholder="Enter the amount"
              value={formData.partPaymentAmount || ''}
              onChange={handleChange}
            />
          </>
        )}

        <p>Select Payment Method</p>
        <CustomSelect
          name="paymentMethod"
          options={paymentOptions}
          onChange={(option) => handleSelectChange("paymentMethod", option)}
          value={formData.paymentMethod?.value || null}
          placeholder="Select a payment method"
        />

        <Button onClick={handleNext} text="Next"/>
      </div>
    </OnboardingTemplate>
  );
};

export default SalesStepTwo;
