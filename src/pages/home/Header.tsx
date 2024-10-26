import React, { ReactNode } from "react";
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/dataContext";

interface HeaderProps {
  children: ReactNode; // Allows dynamic content to be passed as children
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <>
      <IonPage id="main-content">
        <IonHeader className="!bg-white border-none sticky top-0 z-10 min-h-20 pt-4 !shadow-none ">
          <div className="!bg-white py-4 flex justify-between px-2">
            <img
              src="assets/svgs/logo.svg"
              alt="logo"
              className="h-12 w-auto px-5"
            />
          </div>
        </IonHeader>

        <IonContent className="ion-padding">
          {children} {/* Dynamic content passed as children */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Header;
