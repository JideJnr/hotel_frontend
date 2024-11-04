import { IonButtons, IonLabel, IonPage, useIonRouter } from "@ionic/react";
import React, { FormEvent, useEffect, useState } from "react";
import OnboardingPage from "../../../components/OnboardingPage";
import RccgPasswordInput from "../../../components/RccgPasswordInput";
import OtpVerification from "../../../components/OtpVerification";

const CreatePassword = () => {
  const [otp, setOtp] = useState<string>(""); // Type for OTP is a string
  const [isOtpModalOpen, setOtpModal] = useState(false);

  const handleChange = (otp: string) => setOtp(otp);

  const handleVerify = () => {
    console.log("Entered OTP:", otp);
  };

  const openOtpModal = () => {};

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <OnboardingPage titleOne="Welcome to" titleTwo="Living Faith Chapel">
      <div className="overflow-hidden">
        <div className="blob fixed top-24 translate-y-24 -left-5"></div>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <IonLabel>Create Password</IonLabel>
            <RccgPasswordInput placeholder="Create password" />
          </div>

          <div className="form-field">
            <IonLabel>Confirm Password</IonLabel>
            <RccgPasswordInput placeholder="Confirm password" />
          </div>

          <div className="form-button-wrapper">
            <IonButtons>
              <button
                onClick={() => setOtpModal(true)}
                type="button"
                className="rccg-btn-primary"
              >
                Create Account
              </button>
            </IonButtons>
          </div>
        </form>
        <div className="ring-blob fixed bottom-24 -translate-y-16 -right-12"></div>
      </div>
      {isOtpModalOpen && (
        <OtpVerification
          isOtpModalOpen={isOtpModalOpen}
          closeModal={setOtpModal}
        />
      )}
    </OnboardingPage>
  );
};

export default CreatePassword;
