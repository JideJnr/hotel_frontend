import {  IonPage, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { BackFormContainer, FormHeader, FormInput } from "../..";
import Button from "../../../../components/button/button";

const ClientStepOne = () => {
  const router = useIonRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    phone: '',
    address: '',
    email: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    userName: '',
    phone: '',
    address: '',
    email: ''
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.userName.trim()) newErrors.userName = "Username is required";
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      sessionStorage.setItem("customerData", JSON.stringify(formData));
      router.push("/register/customer/steptwo", "forward", "push");
    } else {
      toast.error("Please fix the errors before continuing.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  return (
    <IonPage>
      <FormHeader />
  
        <BackFormContainer 
          title="Customer Registration" 
          subtitle="Step 1: Basic Information"
          className="max-w-2xl mx-auto w-full"
        >
          <form onSubmit={handleNext} className="space-y-4 w-full">
            <FormInput
              label="Full Name *"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              error={errors.fullName}
              required
            />

            <FormInput
              label="Username *"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="John Doe"
              error={errors.userName}
              required
            />
            <FormInput
              label="Phone Number *"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="8123456789"
              error={errors.phone}
              required
            />

            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              error={errors.email}
            />

            <FormInput
              label="Address *"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, City"
              error={errors.address}
              required
            />

            <div className="pt-4">
              <Button 
                text="Continue" 
                type="submit" 
                className="w-full"
              />
            </div>
          </form>
        </BackFormContainer>
    
    </IonPage>
  );
};

export default ClientStepOne;