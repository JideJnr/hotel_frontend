import { IonLabel } from "@ionic/react";
import OnboardingPage from "../../../components/OnboardingPage";
import { FormProps } from "../../register/customer/StepOne";
import TextInput from "../../../components/input/authInput";
import Button from "../../../components/button/button";

const StepOne = ({ formData, setFormData }: FormProps) => {

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    
     <div className="w-full flex flex-col gap-4">
        
        <div className="flex flex-col gap-2">
          <IonLabel>Email</IonLabel>
          <TextInput
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
        <IonLabel>Password </IonLabel>
          <TextInput
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <IonLabel> Confirm Password</IonLabel>
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>
       

    </div>
  
  );
};

export default StepOne;
