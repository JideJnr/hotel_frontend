import { useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DetailRow, FormContainer } from "../../../../components/forms";
import Button from "../../../../components/button/button";

interface BookingFormData {
  customer: { value: number; label: string } | null;
  roomNumber: { value: number; label: string } | null;
  bookingInstruction: string;
  checkInDate: string;
  checkOutDate: string;
  price: string;
  paymentType?: { value: string; label: string } | null;
  paymentMethod?: { value: string; label: string } | null;
  partPaymentAmount?: string;
}

const BookingStepTwo = () => {
  const router = useIonRouter();
  const [formData, setFormData] = useState<BookingFormData>({
    customer: null,
    roomNumber: null,
    bookingInstruction: '',
    checkInDate: '',
    checkOutDate: '',
    price: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookingData = () => {
      try {
        const savedData = sessionStorage.getItem("bookingData");
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setFormData(parsedData);
        } else {
          toast.error("No booking data found. Please start over.");
          router.push("/bookings/create/stepone", "back", "push");
        }
      } catch (error) {
        toast.error("Failed to load booking data");
        console.error("Error loading booking data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookingData();
  }, []);

  const handleConfirm = async () => {
    try {
      // Here you would typically send the data to your API
      console.log("Confirming booking:", formData);
      
      // Clear session storage after successful submission
      sessionStorage.removeItem("bookingData");
      
      toast.success("Booking confirmed successfully!");
      router.push("/bookings", "forward", "replace");
    } catch (error) {
      toast.error("Failed to confirm booking. Please try again.");
      console.error("Booking confirmation error:", error);
    }
  };

  const handleBack = () => {
    router.push("/bookings/create/stepone", "back", "push");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading booking details...</p>
      </div>
    );
  }

  // Calculate duration of stay
  const getDuration = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;
    const diff = new Date(formData.checkOutDate).getTime() - 
                 new Date(formData.checkInDate).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Calculate total amount
  const getTotalAmount = () => {
    const duration = getDuration();
    const price = parseFloat(formData.price) || 0;
    return (duration * price).toLocaleString();
  };

  return (
    <FormContainer 
      title="Confirm Booking Details"
      subtitle="Please review all information before confirming"
      className="max-w-2xl"
    >
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-4">Booking Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailRow label="Customer" value={formData.customer?.label || 'Not specified'} />
            <DetailRow label="Room" value={formData.roomNumber?.label || 'Not specified'} />
            <DetailRow label="Check-in Date" value={
              formData.checkInDate ? new Date(formData.checkInDate).toLocaleDateString() : 'Not specified'
            } />
            <DetailRow label="Check-out Date" value={
              formData.checkOutDate ? new Date(formData.checkOutDate).toLocaleDateString() : 'Not specified'
            } />
            <DetailRow label="Duration" value={`${getDuration()} nights`} />
            <DetailRow label="Price per night" value={`₦${parseFloat(formData.price || '0').toLocaleString()}`} />
            <DetailRow label="Total Amount" value={`₦${getTotalAmount()}`} />
          </div>
          
          {formData.bookingInstruction && (
            <div className="mt-4">
              <DetailRow label="Special Instructions" value={formData.bookingInstruction} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button 
            text="Confirm Booking"
            onClick={handleConfirm}
            className="w-full"
          />
          <Button 
            text="Back to Edit"
            onClick={handleBack}
            variant="outline"
            className="w-full"
          />
        </div>
      </div>
    </FormContainer>
  );
};



export default BookingStepTwo;