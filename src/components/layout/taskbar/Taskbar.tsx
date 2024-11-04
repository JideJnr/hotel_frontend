import React, { ReactNode } from "react";
import { IonContent, IonHeader, IonPage } from "@ionic/react";
interface HeaderProps {
  children: ReactNode; // Allows dynamic content to be passed as children
}

const Taskbar: React.FC<HeaderProps> = ({ children }) => {
  return (
    <>
      <IonPage id="main-content">
        <IonHeader className="!bg-white border-none sticky top-0 z-10 min-h-20 pt-4 !shadow-none ">
          <div className="!bg-white py-4 flex justify-between px-2">
            <img
              src="assets/images/bjimage.png"
              alt="logo"
              className="h-12 w-fit px-5 mx-auto"
            />
          </div>
        </IonHeader>

        <IonContent className="ion-padding">{children}</IonContent>
      </IonPage>
    </>
  );
};

export default Taskbar;
