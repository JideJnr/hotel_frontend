import { IonImg } from "@ionic/react";
import React from "react";

interface RccgPageHeaderProp {
  titleOne: string;
  titleTwo?: string;
}

const RccgPageHeader = ({ titleOne, titleTwo }: RccgPageHeaderProp) => {
  return (
    <div className="flex justify-center flex-col gap-2 items-center mt-2 mb-10">
      <div className="">
        <div>
          <IonImg src="/assets/images/rccg-logo.png" alt="logo" />
        </div>
      </div>
      <div className="mt-2 text-center">
        <h2 className="onboard-title font-inter">
          {titleOne}
          <div className="onboard-title">{titleTwo}</div>
        </h2>
      </div>
    </div>
  );
};

export default RccgPageHeader;
