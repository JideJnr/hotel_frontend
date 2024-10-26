import { IonButtons, IonLabel, IonPage, useIonRouter } from "@ionic/react";
import React, { FormEvent } from "react";
import OnboardingPage from "../../../components/OnboardingPage";
import RccgPasswordInput from "../../../components/RccgPasswordInput";

const RecoverPassword = () => {
  const router = useIonRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/create-account", "forward");
  };

  return (
    <OnboardingPage titleOne="Welcome to" titleTwo="Living Faith Chapel">
      <div className="overflow-hidden">
        <div className="blob fixed top-24 translate-y-24 -left-5"></div>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <IonLabel>Password</IonLabel>
            <RccgPasswordInput placeholder="Enter password" />
          </div>

          <div className="form-button-wrapper">
            <IonButtons>
              <button className="rccg-btn-primary">Login</button>
            </IonButtons>
          </div>
        </form>

        <div className="flex mt-10 justify-center items-center">
          <div className="forgot-password">Forgot Password?</div>
        </div>

        <div className="ring-blob fixed bottom-24 -translate-y-16 -right-12"></div>
      </div>
    </OnboardingPage>
  );
};

export default RecoverPassword;
