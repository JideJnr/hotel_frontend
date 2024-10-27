import { IonPage, IonContent } from "@ionic/react";

import { useEffect, useState } from "react";
import { useDataContext } from "../../context/dataContext";
import Admin from "../admin/admin";
import Start from "./Home";

function Landing() {
  const { user } = useDataContext();
  const [formData, setFormData] = useState({});
  const [welcomeModal, setWelcomeModal] = useState(false);

  useEffect(() => {
    if (user?.role === "admin") {
      setWelcomeModal(true);
    }
  }, [user]);
  console.log(formData);

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        {!welcomeModal ? (
          <Start formData={formData} setFormData={setWelcomeModal} />
        ) : (
          <>
            <Admin
              setFormData={setFormData}
              setModal={setWelcomeModal}
              formData={formData}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Landing;
