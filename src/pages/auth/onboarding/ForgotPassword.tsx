import { IonButtons, IonLabel, IonPage, useIonRouter } from "@ionic/react";
import OnboardingPage from "../../../components/OnboardingPage";
import RccgTextInput from "../../../components/RccgTextInput";
import { FormEvent } from "react";

const ForgotPassword = () => {
  const router = useIonRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/create-password");
  };
  return (
    <OnboardingPage titleOne="Forgot password">
      <div className="!overflow-hidden">
        <div className="blob fixed top-24 translate-y-24 -left-5"></div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <IonLabel>Email / Phone number</IonLabel>
            <RccgTextInput placeholder="Enter phone number" />
          </div>

          <div className="form-button-wrapper">
            <IonButtons>
              <button className="rccg-btn-primary">Continue</button>
            </IonButtons>
          </div>
        </form>

        <div className="ring-blob fixed bottom-24 -translate-y-16 -right-12"></div>
      </div>
    </OnboardingPage>
  );
};

export default ForgotPassword;
