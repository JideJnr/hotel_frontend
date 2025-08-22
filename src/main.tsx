import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { addIcons } from "ionicons";
import { people, personAdd, cash, book } from 'ionicons/icons';
import { PushNotifications } from '@capacitor/push-notifications';

const container = document.getElementById("root");
const root = createRoot(container!);


PushNotifications.requestPermissions().then(result => {
  if (result.receive === 'granted') {
    PushNotifications.register();
  }
});

PushNotifications.addListener('registration', token => {
  console.log('Push registration success, token: ' + token.value);
  // Send token to your server if needed
});

PushNotifications.addListener('registrationError', err => {
  console.error('Push registration error: ', err);
});

PushNotifications.addListener('pushNotificationReceived', notification => {
  console.log('Push received: ', notification);
  // Handle notification
});

PushNotifications.addListener('pushNotificationActionPerformed', notification => {
  console.log('Push action performed: ', notification);
  // Handle notification tap
});

addIcons({
  'people': people,
  'person-add': personAdd,
  'cash': cash,
  'book': book 
});
root.render(
  <React.StrictMode>
    <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    <App />
  </React.StrictMode>,
);
