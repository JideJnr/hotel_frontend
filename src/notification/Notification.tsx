
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "../../firebase";

const messaging = getMessaging(firebaseApp);

export const requestNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "your-public-vapid-key",
    });
    if (token) {
      console.log("FCM Token:", token);
      // Send the token to your server to send notifications later
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

export const listenForMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
   
  });
};
