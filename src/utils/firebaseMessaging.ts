import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const requestAndSaveFcmToken = async (userId: string) => {
  try {
    const messaging = getMessaging();

    // Request permission to send notifications
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Get FCM token
      const fcmToken = await getToken(messaging, {
        vapidKey: "YOUR_PUBLIC_VAPID_KEY", // Replace with your VAPID key
      });

      if (fcmToken) {
        console.log("FCM Token:", fcmToken);

        // Save the FCM token to Firestore for the user
        const userRef = doc(db, "userRecord", userId);
        await setDoc(userRef, { fcmToken }, { merge: true });
        console.log("FCM token saved to Firestore!");
      } else {
        console.error("Failed to get FCM token.");
      }
    } else {
      console.error("Permission not granted for notifications.");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

export const monitorFcmTokenRefresh = async (userId: string) => {
  try {
    const messaging = getMessaging();

    // Listen for new token generation
    messaging.onTokenRefresh(async () => {
      try {
        const newToken = await getToken(messaging, {
          vapidKey: "YOUR_PUBLIC_VAPID_KEY", // Replace with your VAPID key
        });

        if (newToken) {
          console.log("New FCM Token:", newToken);

          // Update the token in Firestore
          const userRef = doc(db, "users", userId);
          await setDoc(userRef, { fcmToken: newToken }, { merge: true });
          console.log("FCM token updated in Firestore!");
        }
      } catch (error) {
        console.error("Error refreshing FCM token:", error);
      }
    });

    console.log("Monitoring for FCM token refresh.");
  } catch (error) {
    console.error("Error setting up FCM token monitoring:", error);
  }
};
