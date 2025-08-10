import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  DetailRow,
  FormHeader,
  BackFormContainer
} from "../../../../components/forms";
import Button from "../../../../components/button/button";
import { useBookingStore } from "../../../../services/stores/BookingStore";


interface BookingData {
  customerId: number | null;
  customerName: string | null;
  roomId: number | null;
  roomLabel: string | null;
  checkInDate: string;
  checkOutDate: string;
  bookingInstruction: string;
  paymentMethodId: number | null;
  paymentMethodLabel: string | null;
  price: string;
}

export default function BookingStepTwo() {
  const router = useIonRouter();
  const [formData, setFormData] = useState<BookingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { createBooking } = useBookingStore(); // Action to send booking to backend

  useEffect(() => {
    const stored = sessionStorage.getItem("bookingData");
    if (stored) {
      try {
        setFormData(JSON.parse(stored));
      } catch {
        handleDataError("Invalid booking data format");
      }
    } else {
      handleDataError("No booking data found");
    }
  }, []);

  const handleDataError = (message: string) => {
    toast.error(`${message}. Please start again.`);
    router.push("/register/booking/stepone", "back", "push");
  };

  const handleConfirm = async () => {
    if (!formData) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        customerId: formData.customerId,
        roomId: formData.roomId,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        bookingInstruction: formData.bookingInstruction || null,
        paymentMethodId: formData.paymentMethodId || null,
        price: formData.price
      };

      const response = await createBooking(payload);

      if (response.success) {
        sessionStorage.removeItem("bookingData");
        toast.success("Booking confirmed successfully!");
        router.push("/bookings", "forward", "replace");
      } else {
        throw new Error(response.error || "Failed to confirm booking");
      }
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to confirm booking";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
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
            <DetailRow label="Customer" value={formData.customerName} />
            <DetailRow label="Room" value={formData.roomLabel} />
            <DetailRow label="Check-in Date" value={formData.checkInDate} />
            <DetailRow label="Check-out Date" value={formData.checkOutDate} />
            <DetailRow label="Price" value={`₦${Number(formData.price).toLocaleString()}`} />
            {formData.paymentMethodLabel && (
              <DetailRow label="Payment Method" value={formData.paymentMethodLabel} />
            )}
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
      </BackFormContainer>
    </IonPage>
  );
}
