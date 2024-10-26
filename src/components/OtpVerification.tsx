import React, { useState, useRef } from "react";
import {
  IonContent,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButtons,
  useIonRouter,
} from "@ionic/react";
import PageWrapper from "./PageWrapper";

interface OtpVerificationProp {
  isOtpModalOpen: boolean;
  closeModal: (value: boolean) => void;
}

const OtpVerification = ({
  closeModal,
  isOtpModalOpen,
}: OtpVerificationProp) => {
  const router = useIonRouter();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLIonInputElement | null)[]>([]);

  const handleChange = (e: CustomEvent, index: number) => {
    const value = e.detail.value || "";

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input if it exists
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.setFocus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        // Clear the previous input and move focus
        if (index > 0 && inputRefs.current[index - 1]) {
          inputRefs.current[index - 1]?.setFocus();
          // Directly manipulate the previous input's value to clear it
          inputRefs.current[index - 1]!.value = "";
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    router.push("/login");
  };

  return (
    <>
      {isOtpModalOpen && (
        <IonContent className="">
          <div
            onClick={() => closeModal(false)}
            className="w-full bg-[rgba(15,14,17,0.62)] z-50 fixed top-0 left-0 flex items-end h-screen"
          >
            <PageWrapper>
              <IonGrid
                onClick={(event) => event.stopPropagation()}
                className="bg-white rounded-[1rem] z-[49] p-5"
              >
                <IonRow className="text-center">
                  <IonCol size="12">
                    <IonText>
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-1 bg-gray-300"></div>
                      </div>
                      <h2 className="text-2xl font-semibold mt-5">
                        Number Verification
                      </h2>
                      <p className="text-base text-gray-600">
                        Please check your phone number. We’ve sent a code to
                        01896344
                      </p>
                    </IonText>
                  </IonCol>
                  <IonCol size="12">
                    <div className="flex justify-center gap-2.5">
                      {otp.map((value, index) => (
                        <IonInput
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="tel"
                          maxlength={1}
                          value={value}
                          onIonInput={(e) =>
                            handleChange(e as CustomEvent, index)
                          }
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          className="w-10 h-10 text-center text-lg border border-gray-300 rounded-md"
                        />
                      ))}
                    </div>
                  </IonCol>
                  <IonCol size="12">
                    <IonButtons>
                      <button
                        onClick={handleVerify}
                        type="button"
                        className="rccg-btn-primary mt-4 mb-3"
                      >
                        Verify Now
                      </button>
                    </IonButtons>
                  </IonCol>
                  <IonCol size="12">
                    <IonText color="medium">
                      <p className="text-sm text-gray-600">
                        Didn’t get a code?{" "}
                        <a href="#" className="text-blue-600 underline">
                          Resend Code
                        </a>
                      </p>
                    </IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </PageWrapper>
          </div>
        </IonContent>
      )}
    </>
  );
};

export default OtpVerification;
