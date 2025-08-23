import { FirebaseMessaging } from '@capacitor-firebase/messaging';

export async function registerPushNotifications(userId: string) {
  // Ask permission
  const permStatus = await FirebaseMessaging.requestPermissions();
  if (permStatus.receive !== 'granted') {
    console.warn('Push notification permission not granted');
    return;
  }

  // Get FCM token
  const tokenResult = await FirebaseMessaging.getToken();
  const fcmToken = tokenResult.token;

  console.log("Got FCM token:", fcmToken);

  // Save token to your backend / Firestore
  // Example: update user's Firestore record
  await fetch("/api/save-fcm-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, fcmToken }),
  });
}