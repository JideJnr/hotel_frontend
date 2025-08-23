// Add this utility function somewhere accessible, e.g., src/services/FirebaseNotification.ts
import { PushNotifications } from '@capacitor/push-notifications';

export async function getFcmToken(): Promise<string | null> {
  try {
    const result = await PushNotifications.requestPermissions();
    if (result.receive === 'granted') {
      return new Promise<string | null>((resolve) => {
        PushNotifications.addListener('registration', (token) => {
          resolve(token.value);
        });
        PushNotifications.addListener('registrationError', (error) => {
          console.error('FCM registration error:', error);
          resolve(null);
        });
        PushNotifications.register();
      });
    }
    return null;
  } catch (e) {
    console.error('Failed to get FCM token', e);
    return null;
  }
}