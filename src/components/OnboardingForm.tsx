import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import React from "react";

const OnboardingForm = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="w-[90%] mx-auto pt-12  pb-5">
          <IonButtons slot="start">
            <IonImg onClick={goBack} src="/assets/icons/arrow-back-icon.png" />
          </IonButtons>

          <div className="flex justify-center flex-col gap-2 items-center mt-2">
            <div className="">
              <div>
                <IonImg src="/assets/images/rccg-logo.png" alt="logo" />
              </div>
            </div>
            <div className="mt-2 text-center">
              <h2 className="onboard-title">
                Welcome to <br /> Living Faith Chapel
              </h2>
            </div>
          </div>

          <div>
            <form>
              <div className="form-field">
                <IonLabel>Email / Phone number</IonLabel>
                <IonInput />
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OnboardingForm;
