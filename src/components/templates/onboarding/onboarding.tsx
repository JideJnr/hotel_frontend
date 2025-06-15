import { IonContent, IonImg, IonPage } from "@ionic/react";
import { ReactNode } from "react";

interface OnboardingPageProp {
  titleOne: string;
  children: ReactNode;
}

const OnboardingTemplate = ({
  children,
  titleOne,
  
}: OnboardingPageProp) => {
  return (
    <IonPage className="!overflow-hidden">
      <IonContent fullscreen>
      <div className="w-[90%] mx-auto pt-12  pb-5 !overflow-hidden">
        <div className="flex justify-center flex-col gap-2 items-center mt-2 mb-10">
      <div>
        <IonImg src="assets/images/bjimage.png" alt="logo" />
      </div>

      <div className="mt-2 text-center">
        <p className=" text-xl">{titleOne}</p>
      </div>
    </div>

          {children}
          </div>
      </IonContent>
    </IonPage>
  );
};

export default OnboardingTemplate;
