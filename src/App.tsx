import React, { useEffect } from "react";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Routes from "./routes/Routes";

import { App as CapacitorApp } from "@capacitor/app";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
import "./index.css";
import { AuthProvider } from "./context/auth";
import { DataProvider } from "./context/dataContext";
import { ActivityProvider } from "./context/activityContext";
import { listenForMessages, requestNotificationPermission } from "./notification/Notification";
import { PushNotifications } from "@capacitor/push-notifications";
import { DarkModeProvider } from "./context/darkModeContext";



setupIonicReact();

const App: React.FC = () => {

  
  useEffect(() => {
    const handler = () => {
      // Do nothing to disable the back button globally
    };
  
    // Add global event listener for the back button
    const addBackButtonListener = async () => {
      const backButtonListener = await CapacitorApp.addListener("backButton", handler);
  
      // Cleanup: remove the listener on unmount
      return backButtonListener.remove;
    };
  
    // Call the async function to add the listener
    const cleanup = addBackButtonListener();
  
    return () => {
      // Cleanup the listener on unmount
      cleanup.then((removeListener) => removeListener());
    };
  }, []);

  useEffect(() => {
    requestNotificationPermission();
    listenForMessages();
  }, []);

  useEffect(() => {
    // Request permissions
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === "granted") {
        PushNotifications.register();
      } else {
        console.error("Push notification permission denied");
      }
    });
  
    // Handle registration
    PushNotifications.addListener("registration", (token) => {
      console.log("Push registration token:", token.value);
    });
  
    // Handle registration errors
    PushNotifications.addListener("registrationError", (error) => {
      console.error("Push registration error:", error);
    });
  
    // Handle push notification delivery
    PushNotifications.addListener("pushNotificationReceived", (notification) => {
      console.log("Push notification received:", notification);
    });
  
    // Handle notification tap
    PushNotifications.addListener("pushNotificationActionPerformed", (action) => {
      console.log("Push notification action performed:", action);
    });
  }, []);
  
  

  return (
    <IonApp>
      <AuthProvider>
        <DataProvider>
          <ActivityProvider>
          <DarkModeProvider>
            <IonReactRouter>
              <Routes />
            </IonReactRouter>
            </DarkModeProvider>
          </ActivityProvider>
        </DataProvider>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
