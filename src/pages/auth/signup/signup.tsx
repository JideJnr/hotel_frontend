import {  useIonRouter } from "@ionic/react";
import  {  useEffect, useState } from "react";
import { FormProps } from "../../register/customer/StepOne";
import useCreateClientProfile from "../../../services/UseCreateClientProfile";
import { toast } from "react-toastify";
import OnboardingPage from "../../../components/OnboardingPage";
import StepTwo from "./steptwo";
import StepOne from "./stepone";
import Button from "../../../components/button/button";

const SignUp = ({ formData:data, setFormData:setModal }: FormProps) => {
  const router = useIonRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const { createClientProfile, handleSignup, loading, error, data: userData } = useCreateClientProfile({
    formData,
  });


  
  const handleSubmit = async () => {
    try {
      const success = await createClientProfile();
      if (success) {
        router.push("/main");
      }
    } catch (err) {
      console.error("Error creating profile:", err);
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all required fields.");
    } else {
      setIsLoading(true); // Start loading
      try {
        const success = await handleSignup();
        if (success) {
          setModalVisible(true);
        }
      } catch (err) {
        console.error("Error during signup:", err);
        toast.error("Signup failed. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };
  useEffect(() => {
    if (userData?.user?.uid) {
      setFormData((prevData) => ({
        ...prevData,
        id: userData.user.uid,
      }));
    }
  }, [userData]);

 
  return (
    <OnboardingPage titleOne={'enter your details to signup'}>
    <div className=" p-4 gap-4 flex flex-col">

 <div className="blob fixed top-24 translate-y-24 -left-5"></div>
     
      {isModalVisible ? (
        <StepTwo formData={formData} setFormData={setFormData}/>
      ) : (
        <StepOne formData={formData} setFormData={setFormData} />
      )}

      <div className="flex  flex-col gap-4 mt-4">
      


        {!isModalVisible ? (
          <Button loading={isLoading} text="Continue" loadingText="Loading..." className="w-full" onClick={handleNext} />
        ) : (
          <Button
            text="Submit"
            loadingText="submitting.."
            className="w-full"
            onClick={handleSubmit}
            loading={loading}
          />
        )}

        

      </div>

      <div className="ring-blob fixed bottom-24 -translate-y-16 -right-12"></div>
    
    </div>
    </OnboardingPage>
  );
};

export default SignUp;
