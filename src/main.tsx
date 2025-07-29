import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { addIcons } from "ionicons";
import { people, personAdd, cash, book } from 'ionicons/icons';

const container = document.getElementById("root");
const root = createRoot(container!);

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
