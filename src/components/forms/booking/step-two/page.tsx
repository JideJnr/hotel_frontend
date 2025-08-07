import { IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BackFormContainer, DetailRow, FormContainer, FormHeader } from "../../../../components/forms";
import Button from "../../../../components/button/button";



const BookingStepTwo = () => {
  const router = useIonRouter();
  const [formData, setFormData] = useState<BookingData>({
    customerId: null,
    customerName: null,
    roomId: null,
    roomLabel: null,
    bookingInstruction: '',
    checkInDate: '',
    checkOutDate: '',
    paymentMethodId: null,
    paymentMethodLabel: null,
    price: ''
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
  <IonPage>
    <FormHeader/>
    <BackFormContainer 
      title="Confirm Booking Details"
      subtitle="Please review all information before confirming"
      className="max-w-2xl"
    >
      <div className="space-y-6 pb-12">
        <div className="">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <DetailRow label="Customer" value={formData.customerName || 'Not specified'} />
            </div>
            <div className="col-span-1">
              <DetailRow label="Room" value={formData.roomLabel || 'Not specified'} />
            </div>
            <div className="col-span-1">
              <DetailRow label="Duration" value={`${getDuration()} nights`} />
            </div>
            <div className="col-span-1">
              <DetailRow label="Check-in Date" value={
              formData.checkInDate ? new Date(formData.checkInDate).toLocaleDateString() : 'Not specified'
            } />
            </div>
            <div className="col-span-1">
                          <DetailRow label="Check-out Date" value={
              formData.checkOutDate ? new Date(formData.checkOutDate).toLocaleDateString() : 'Not specified'
            } />
            

            </div>
            <div className="col-span-1">
              <DetailRow label="Price per night" value={`₦${parseFloat(formData.price || '0').toLocaleString()}`} />
            </div>
            <div className="col-span-1">
              <DetailRow label="Total Amount" value={`₦${getTotalAmount()}`} />
            </div>

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
        </div>
      </div>
    </BackFormContainer>
  </IonPage>
  );
};



export default BookingStepTwo;