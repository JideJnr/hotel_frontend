import OnboardingTemplate from "../../../../components/templates/onboarding/onboarding";
import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/button/button";

const ClientStepOne = () => {
  const router = useIonRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    email: '' // Added email field
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    address: '',
    email: ''
  });

  const handleNext = () => {
    const newErrors: any = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    
    // Basic email validation
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      <div className="flex flex-col gap-4 w-full h-full p-4">
        <div className="flex flex-col gap-2">
          <p className="font-medium">Full Name *</p>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-md sm:leading-6"
            placeholder="John Doe"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium">Phone Number *</p>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-md sm:leading-6"
            placeholder="8123456789"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium">Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-md sm:leading-6"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium">Address *</p>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-md sm:leading-6"
            placeholder="123 Main St, City"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="mt-4">
          <Button text="Continue" onClick={handleNext} />
        </div>
      </div>
  
  );
};

export default ClientStepOne;