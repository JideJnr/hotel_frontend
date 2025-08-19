import { IonPage, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { BackFormContainer, FileUpload, FormHeader, FormInput, FormTextarea } from "../../../../../components/forms";
import Button from "../../../../../components/button/button";


const BookingPaymentStepOne = () => {
  const router = useIonRouter();

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    receiptBase64: '', // Add base64 field
  });

  const [errors, setErrors] = useState({
    amount: '',
    description: '',
    date: '',
  });

  const validateForm = () => {
    const newErrors = {
      amount: !formData.amount || isNaN(parseFloat(formData.amount))
        ? 'Valid amount is required' : '',
      description: !formData.description.trim()
        ? 'Description is required' : '',
      date: !formData.date
        ? 'Date is required' : '',
    };

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSave = {
        ...formData,
        id: '222',
       
      };
      sessionStorage.setItem("bookingPaymentData", JSON.stringify(dataToSave));
      router.push("/register/booking/payment/steptwo", "forward", "push");
    } else {
      toast.error("Please fix the errors before continuing.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // File to base64 handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, receiptBase64: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <IonPage>
      <FormHeader  />
      <BackFormContainer
        title="Confirm Booking Payment"
        subtitle="Step 1: Enter booking payment details"
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Amount *"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            error={errors.amount}
            required
          />

          <FormTextarea
            label="Description *"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description?"
            rows={3}
            error={errors.description}
            required
          />


          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Receipt (Optional)
            </label>
            <FileUpload
              accept=".jpg,.jpeg,.png,.pdf"
              maxSize={5}
              onChange={handleFileChange}
              preview={formData.receiptBase64}
              onRemove={() => setFormData(fd => ({ ...fd, receiptBase64: '' }))}
            />
          
          </div>

        
          <div className="pt-4">
            <Button text="Continue" type="submit" className="w-full" />
          </div>
        </form>
      </BackFormContainer>
    </IonPage>
  );
};

export default BookingPaymentStepOne;
