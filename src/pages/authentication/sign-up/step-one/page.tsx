import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { FormContainer, FormInput, FormFooter } from "../../../../components/forms";
import Button from "../../../../components/button/button";

const Signup = () => {
  const router = useIonRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const validatePhone = (phone: string) => /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(phone);

  const validateField = (field: string, value: string) => {
    if (!value.trim()) return "This field is required";
    if (field === "phone" && !validatePhone(value)) return "Invalid phone number";
    if (field === "fullName" && value.length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      phone: validateField("phone", formData.phone),
      address: validateField("address", formData.address),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((e) => !e)) {
      sessionStorage.setItem("coreDetails", JSON.stringify(formData));
      router.push("/signup/steptwo", "forward", "replace");
    } else {
      toast.error("Please fix the errors before continuing.");
    }
  };

  return (
    <IonPage>
      <IonContent className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
        
       
    <FormContainer 
      title="Complete your profile" 
      subtitle="We need a few more details to get started"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          error={errors.fullName}
          required
        />

        <FormInput
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          error={errors.phone}
          required
        />

        <FormInput
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
          error={errors.address}
          required
        />

        <Button 
          text="Next" 
          type="submit" 
          className="w-full"
        />

        <FormFooter
          promptText="Already have an account?"
          linkText="Sign in"
          linkPath="/sign-in"
        />
      </form>
    </FormContainer>

     </IonContent>
    </IonPage>
  );
};

export default Signup;