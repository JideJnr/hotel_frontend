import { IonPage } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useIonRouter } from "@ionic/react";
import { useBooking } from "../../../../../contexts/data/BookingContext";
import Button from "../../../../../components/button/button";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../../components/forms";


const BookingPaymentStepTwo = () => {
  const router = useIonRouter();
  const { updateBooking } = useBooking();
  const [formData, setFormData] = useState<any | null>(null);

  useEffect(() => {
    const loadStoredData = () => {
      const storedData = sessionStorage.getItem("bookingPaymentData");
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          if ( !parsedData?.amount) {
            throw new Error("Invalid bookingpayment data");
          }
          setFormData(parsedData);
        } catch (error) {
          toast.error("Invalid bookingpayment data format");
          router.push("/booking/payment/stepone", "back", "push");
        }
      } else {
        toast.error("No booking payment data found. Please start over.");
        router.push("/booking/payments/stepone", "back", "push");
      }
    };

    loadStoredData();
  }, [router]);
  {/*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    
    setIsSubmitting(true);

    try {
      const bookingpaymentPayload = {
        category: formData.category.value,
        amount: parseFloat(formData.amount),
        description: formData.description,
        receiptURL: formData.receiptBase64,
        paymentMethod: formData.paymentMethod,
        reference: formData.reference,
        date: new Date().toISOString()
      };

      await updateBooking(bookingpaymentPayload);
    } catch (err: any) {
     
    } finally {
      setIsSubmitting(false);
    }
  };
 */}
  if (!formData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading bookingpayment data...</p>
      </div>
    );
  }

  return (
    <IonPage>
      <FormHeader />
      
      <BackFormContainer
        title="Payment Details" 
        subtitle="Please review the information before submitting"
        className="max-w-md"
      >
        <div className="space-y-6">
          <div className="space-y-4">

            <DetailRow label="Amount" value={formData.amount} />
            {formData.description && <DetailRow label="Description" value={formData.description} />}
          </div>

          {formData.receiptBase64 && (
            <div>
              <img 
                src={formData.receiptBase64} 
                alt="Receipt preview" 
                className="mt-2 max-h-40 rounded w-full max-w-32" 
              />
            </div>
          )}
          
          <div className="flex flex-col gap-3 pt-4">
            <Button 
              text="Submit"
             
              loadingText="Submitting..."
              className="w-full"
            />
          </div>
        </div>
      </BackFormContainer>
    </IonPage>
  );
};

export default BookingPaymentStepTwo;