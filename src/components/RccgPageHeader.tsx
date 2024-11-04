import { IonImg } from "@ionic/react";
import React from "react";

interface RccgPageHeaderProp {
  titleOne: string;
  titleTwo?: string;
}

const RccgPageHeader = ({ titleOne }: RccgPageHeaderProp) => {
  return (
    <div className="flex justify-center flex-col gap-2 items-center mt-2 mb-10">
      <div>
        <IonImg src="assets/images/bjimage.png" alt="logo" />
      </div>

      <div className="mt-2 text-center">
        <p className=" text-xl">{titleOne}</p>
      </div>
    </div>
  );
};

export default RccgPageHeader;
