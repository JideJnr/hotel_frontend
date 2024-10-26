import React from "react";
import {
  IonContent,
  IonImg,
  IonButton,
  IonModal,
  useIonRouter,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
} from "@ionic/react";

const CreatePassword: React.FC = () => {
  const router = useIonRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.goBack();
    } else {
      router.push("/home");
    }
  };

  const navigateToHome = () => {
    router.push("/home", "forward"); // Navigates to /home with a forward animation
  };

  const navigateToForgotPassword = () => {
    router.push("/forgotpassword", "forward"); // Navigates to /forgotpassword with a forward animation
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleBack}>
              <IonImg
                src="/assets/icons/arrow-back-icon.png"
                alt="logo"
                className=""
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="flex flex-col items-center px-6">
        <div className="w-full flex flex-col items-center mt-12 px-4 gap-4">
          <IonImg
            src="/assets/images/rccg-logo.png"
            alt="logo"
            className="w-28 h-14 mb-6"
          />

          <div className="text-center mb-14 max-w-xs">
            <h2 className="text-xl font-bold leading-10 tracking-tighter">
              Welcome to
              <br />
              Living Faith Chapel
            </h2>
          </div>

          <div className="w-full flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-normal text-black mb-1.5">
                  Create Password
                </label>
              </div>
              <div>
                <label className="block text-sm font-normal text-black mb-1.5">
                  Confirm Password
                </label>
              </div>
            </div>

            <button
              onClick={navigateToHome}
              className="bg-blue-600  text-white font-bold py-2 px-4 rounded-full  w-full"
            >
              Create Account
            </button>
          </div>

          <button
            onClick={navigateToForgotPassword}
            className=" text-black font-medium py-2 px-4 rounded-full  w-full"
          >
            Forgot Password ?
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreatePassword;
