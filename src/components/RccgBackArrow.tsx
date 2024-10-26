import { IonButtons, IonImg } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";

const RccgBackArrow = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <IonButtons className="cursor-pointer" slot="start">
      <IonImg onClick={goBack} src="/assets/icons/arrow-back-icon.png" />
    </IonButtons>
  );
};

export default RccgBackArrow;
