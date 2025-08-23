import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  DetailRow,
  FormHeader,
  BackFormContainer
} from "../../../../components/forms";
import Button from "../../../../components/button/button";
import { useRecord } from "../../../../contexts/data/RecordContext";
import Footer from "../../../footer/footer";

const SalesStepTwo = () => {
  const router = useIonRouter();
  const [formData, setFormData] = useState<SalesData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { createRecord , loading} = useRecord();

  useEffect(() => {
    const stored = sessionStorage.getItem("bookingData");
    if (stored) {
      try {
        setFormData(JSON.parse(stored));
      } catch (err) {
        handleDataError("Invalid booking data format");
      }
    } else {
      handleDataError("No booking data found");
    }
  }, []);

  const handleDataError = (message: string) => {
    toast.error(`${message}. Please start again.`);
    router.push("/sales/stepone", "back", "push");
  };

  
  const handleConfirm = async () => {
    if (!formData) return;
    try {
      const payload = {
        customerId: formData.customerId,
        customerName: formData.customerName,
        roomId: formData.roomId,
        requestId: formData.requestId || null,
        bookingInstruction: formData.bookingInstruction || 'No Instruction Given',
        paymentMethodId:  formData.paymentMethodId || null,
      };

      await createRecord(payload);
    } catch (err: any) {

    } finally {
    
    }
  };

  if (!formData) {
    return (
      <IonPage>
        <IonContent className="flex items-center justify-center">
          <p className="text-gray-500">Loading booking data...</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer
        title="Confirm Booking Details"
        subtitle="Please review the information before submitting"
        className="max-w-xl"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <DetailRow label="Customer" value={formData.customerName||'-'} />
            <DetailRow label="Room" value={formData.roomName||'-'} />
            <DetailRow label="Request" value={formData.requestLabel||'-'} />
            <DetailRow label="Payment Method" value={formData.paymentMethodLabel||'-'} />
            {formData.bookingInstruction && (
              <DetailRow label="Booking Note" value={formData.bookingInstruction} />
            )}
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <Button
              text="Confirm Booking"
              onClick={handleConfirm}
              loading={loading}
              disabled={loading}
              loadingText="Submitting..."
              className="w-full"
            />
          </div>
        </div>
        <Footer/>
      </BackFormContainer>
      
    </IonPage>
  );
};

export default SalesStepTwo;
