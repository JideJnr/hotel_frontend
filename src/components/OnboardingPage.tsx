import { IonContent, IonPage } from "@ionic/react";

import PageWrapper from "./PageWrapper";
import RccgBackArrow from "./RccgBackArrow";
import RccgPageHeader from "./RccgPageHeader";
import { ReactNode } from "react";

interface OnboardingPageProp {
  titleOne: string;
  titleTwo?: string;
  children: ReactNode;
}

const OnboardingPage = ({
  children,
  titleOne,
  titleTwo,
}: OnboardingPageProp) => {
  return (
    <IonPage className="!overflow-hidden">
      <IonContent fullscreen>
        <PageWrapper>
          <RccgPageHeader titleOne={titleOne} />

          {children}
        </PageWrapper>
      </IonContent>
    </IonPage>
  );
};

export default OnboardingPage;
