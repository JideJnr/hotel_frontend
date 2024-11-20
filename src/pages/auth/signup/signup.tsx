import { useIonRouter } from "@ionic/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import useCreateClientProfile from "../../../services/UseCreateClientProfile";
import { toast } from "react-toastify";
import OnboardingPage from "../../../components/OnboardingPage";
import StepTwo from "./steptwo";
import StepOne from "./stepone";
import Button from "../../../components/button/button";
import Complete from "./Complete";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";

interface SignUpProps {
  setFormData?: Dispatch<SetStateAction<string>>;
}

const SignUp: React.FC<SignUpProps> = () => {
  const router = useIonRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const {
    createClientProfile,
    handleSignup,
    loading,
    error,
    data: userData,
  } = useCreateClientProfile({
    formData,
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  const handleSubmit = async () => {
    try {
      const success = await createClientProfile();
      if (success) {
        setCurrentStepIndex((prevStep) => prevStep + 1);
      }
    } catch (err) {
      console.error("Error creating profile:", err);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all required fields.");
    } else {
      setIsLoading(true); // Start loading
      try {
        const success = await handleSignup();
        if (success) {
          setCurrentStepIndex((prevStep) => prevStep + 1);
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

  const handleSignout = async () => {
    await signOut(auth);
    router.push("/");
    window.location.reload();
  };

  console.log(formData);
  return (
    <OnboardingPage titleOne={"enter your details to signup"}>
      <div className=" p-4 gap-4 flex flex-col">
        <div className="blob fixed top-24 translate-y-24 -left-5"></div>
        {currentStepIndex === 1 && (
          <StepOne formData={formData} setFormData={setFormData} />
        )}
        {currentStepIndex === 2 && (
          <StepTwo formData={formData} setFormData={setFormData} />
        )}
        {currentStepIndex === 3 && <Complete />}

        <div className="flex  flex-col  mt-4">
          {currentStepIndex === 1 && (
            <Button
              loading={isLoading}
              text="Continue"
              loadingText="Loading..."
              className="w-full"
              onClick={handleNext}
            />
          )}

          {currentStepIndex === 2 && (
            <Button
              text="Submit"
              loadingText="submitting.."
              className="w-full"
              onClick={handleSubmit}
              loading={loading}
            />
          )}

          {currentStepIndex === 3 && (
            <Button
              text="Login"
              loadingText="submitting.."
              className="w-full"
              onClick={handleSignout}
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
