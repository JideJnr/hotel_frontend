import React, { ReactNode, useState } from "react";
import { IonContent, IonHeader, IonPage } from "@ionic/react";
import SearchBar from "../searchbar/SearchBar";
interface HeaderProps {
  children: ReactNode;
  backAction?: any;
}

const Header: React.FC<HeaderProps> = ({ children, backAction }) => {
  const [searchModal, setSearchModal] = useState(false);
  return (
    <>
      <IonPage id="main-content">
        <IonHeader className="!bg-white border-none sticky top-0 z-10 min-h-20 pt-4 !shadow-none ">
          <div className="!bg-white py-4 flex px-2">
            {backAction === true && <div>pp</div>}
            <div className="flex flex-1">
              <img
                src="assets/images/bjimage.png"
                alt="logo"
                className="h-12 w-fit px-5 mx-auto"
              />
            </div>
          </div>
        </IonHeader>
       


        <IonContent >{children}</IonContent>
      </IonPage>
    </>
  );
};

export default Header;
