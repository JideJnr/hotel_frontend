// src/components/Loading.tsx
import { IonPage, IonSpinner } from "@ionic/react";
import React from "react";

const Loading: React.FC = () => {
  return (
  <IonPage>    
    <div className="w-full h-full bg-white">
        <IonSpinner name="crescent" />
    </div>
  </IonPage>
  );
};

export default Loading;