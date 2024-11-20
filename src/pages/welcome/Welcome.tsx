import React, { useEffect } from "react";
import { IonContent, IonButton, IonPage, useIonRouter } from "@ionic/react";
import { useDataContext } from "../../context/dataContext";
import Button from "../../components/button/button";
import { PushNotifications } from "@capacitor/push-notifications";

const Welcome: React.FC = () => {
  const { user } = useDataContext();
  const router = useIonRouter();

  // Request Push Notification Permission
  useEffect(() => {
    const requestPushPermission = async () => {
      try {
        // Request permission for push notifications
        const permission = await PushNotifications.requestPermissions();

        if (permission.receive === "granted") {
          console.log("Push notifications permission granted!");
          // Optionally register for push notifications here
          PushNotifications.register();
        } else {
          console.error("Push notifications permission denied");
        }
      } catch (error) {
        console.error("Error requesting push notifications permission:", error);
      }
    };

    requestPushPermission();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex flex-col w-full h-full bg-white ">
          <div className="flex-col mx-auto my-auto ">
            <div className="flex mx-auto flex-col gap-4">
              <img
                src="assets/images/bjimage.png"
                alt="logo"
                className="h-12 w-fit px-5 mx-auto"
              />
            </div>
          </div>

          <div className="h-fit mt-auto flex flex-col gap-4 mb-8 p-4">
            <Button
              className="!w-full !rounded-3xl !bg-emerald-500"
              onClick={() => router.push(!user ? "/signin" : "/main")}
              text="Continue"
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
