import { IonButtons, IonLabel, IonPage, useIonRouter } from "@ionic/react";
import React, { FormEvent } from "react";
import OnboardingPage from "../../../components/OnboardingPage";
import RccgTextInput from "../../../components/RccgTextInput";

const CreateInfo = () => {
  const router = useIonRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/create-password");
  };
  return (
    <OnboardingPage titleOne="Kindly provide your info">
      <div className="overflow-hidden">
        <div className="blob fixed top-24 translate-y-24 -left-5"></div>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <IonLabel>Firstname</IonLabel>
            <RccgTextInput placeholder="Enter Firstname" />
          </div>
          <div className="form-field">
            <IonLabel>Lastname</IonLabel>
            <RccgTextInput placeholder="Enter lastname" />
          </div>
          <div className="form-field">
            <IonLabel>Email / Phone number</IonLabel>
            <RccgTextInput placeholder="Enter phone number" />
          </div>
          <div className="form-field">
            <IonLabel>Address</IonLabel>
            <RccgTextInput placeholder="Enter your address" />
          </div>

          <div className="form-button-wrapper">
            <IonButtons>
              <button className="rccg-btn-primary">Get Started</button>
            </IonButtons>
          </div>
        </form>
        <div className="ring-blob fixed bottom-24 -translate-y-16 -right-12"></div>
      </div>
    </OnboardingPage>
  );
};

export default CreateInfo;
