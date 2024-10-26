import React from "react";
import { IonContent, IonButton, IonPage } from "@ionic/react";
import { useDataContext } from "../../context/dataContext";

const Welcome: React.FC = () => {
  const { user } = useDataContext();
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
            <IonButton
              className="w-full !rounded-3xl"
              routerLink={`${!user ? "/sign-in" : "/home"}`}
            >
              Continue
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
