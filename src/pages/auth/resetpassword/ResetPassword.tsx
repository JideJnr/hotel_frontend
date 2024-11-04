import { IonButtons, IonLabel, IonPage, useIonRouter } from "@ionic/react";
import OnboardingPage from "../../../components/OnboardingPage";
import RccgTextInput from "../../../components/RccgTextInput";
import { FormProps } from "../../register/customer/StepOne";
import Button from "../../../components/button/button";

const ResetPassword = ({ formData, setFormData }: FormProps) => {
  const router = useIonRouter();

  const handleSubmit = () => {
    router.push("/create-password");
  };
  return (
    <OnboardingPage titleOne="Forgot password">
      <div className="!overflow-hidden">
        <div className="blob fixed top-24 translate-y-24 -left-5"></div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <IonLabel>Email / Phone number</IonLabel>
            <RccgTextInput placeholder="Enter phone number" />
          </div>

          <Button
            text="Reset Password"
            loadingText="Loading"
            className="!w-full !mx-auto"
            onClick={() => {
              handleSubmit();
            }}
          />

          <p className="w-fit mx-auto">
            Remember Password?
            <span
              className="ml-1 text-emerald-400 font-semibold "
              onClick={() => {
                setFormData(false);
              }}
            >
              Login
            </span>
          </p>
        </div>

        <div className="ring-blob fixed bottom-24 -translate-y-16 -right-12"></div>
      </div>
    </OnboardingPage>
  );
};

export default ResetPassword;
