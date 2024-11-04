import React from "react";
import { IonContent, IonButton, IonPage, useIonRouter } from "@ionic/react";
import { useDataContext } from "../../context/dataContext";
import Button from "../../components/button/button";

const Welcome: React.FC = () => {
  const { user } = useDataContext();
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen className="bg-cover bg-center">
        <div
          style={{
            backgroundImage: "url('/assets/images/welcome-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-screen flex flex-col justify-between overflow-hidden"
        >
          <div className="h-fit mt-auto flex flex-col gap-4 mb-8 p-4">
            <Button
              className="!w-full !rounded-3xl !bg-emerald-500"
              onClick={() => router.push(!user ? "/signin" : "/home")}
              text="Continue"
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
