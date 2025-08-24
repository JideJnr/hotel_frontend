import { IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  BackFormContainer,
  DetailRow,
  FormHeader
} from "../../../../components/forms";
import Button from "../../../../components/button/button";
import { useBooking } from "../../../../contexts/data/BookingContext";
import { useRoom } from "../../../../contexts/data/RoomContext";
import Footer from "../../../footer/footer";



const BookingStepTwo = () => {
  const router = useIonRouter();
  const { createBooking,loading } = useBooking();
  const { rooms, fetchRooms } = useRoom();

  const [formData, setFormData] = useState<BookingData>({
    customerId: null,
    customerName: null,
    roomId: null,
    roomName: null,
    bookingInstruction: "",
    checkInDate: "",
    checkOutDate: "",
    paymentMethodId: null,
    paymentMethodLabel: null
  });


  const [pricePerNight, setPricePerNight] = useState<number>(0);

  useEffect(() => {
    const loadBookingData = async () => {
      try {
        // await fetchRooms();

        const savedData = sessionStorage.getItem("bookingData");
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setFormData(parsedData);

          // find room price
        //  const room = rooms.find(r => r.id === parsedData.roomId);
          //if (room) {
          //  setPricePerNight(room.price);
         // }
        } else {
          toast.error("No booking data found. Please start over.");
          router.push("/bookings/create/stepone", "back", "push");
        }
      } catch (error) {
        toast.error("Failed to load booking data");
        console.error("Error loading booking data:", error);
      } finally {
        
      }
    };

    loadBookingData();
  }, []);

  const getDuration = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;
    const diff =
      new Date(formData.checkOutDate).getTime() -
      new Date(formData.checkInDate).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getTotalAmount = () => {
    return 20 * getDuration();
  };

  const handleConfirm = async () => {
    if (
      !formData.customerId ||
      !formData.roomId ||
      !formData.checkInDate ||
      !formData.checkOutDate
    ) {
      toast.error("Please complete all required booking information");
      return;
    }

    try {
      const bookingPayload = {
        customerId: formData.customerId,
        customerName: formData.customerName,
        roomId: formData.roomId,
        roomName: formData.roomName,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        bookingInstructions: formData.bookingInstruction,
        status: "BOOKED"
      };

      await createBooking(bookingPayload);

    } catch (error) {

    } finally {
      
    }
  };




  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer
        title="Confirm Booking Details"
        subtitle="Please review all information before confirming"
        className="max-w-2xl"
      >
        <div className="space-y-6 pb-12">
          <div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <DetailRow
                  label="Customer"
                  value={formData.customerName || "Not specified"}
                />
              </div>
              <div className="col-span-1">
                <DetailRow
                  label="Room"
                  value={formData.roomName || "Not specified"}
                />
              </div>
              <div className="col-span-1">
                <DetailRow label="Duration" value={`${getDuration()} nights`} />
              </div>
              <div className="col-span-1">
                <DetailRow
                  label="Check-in Date"
                  value={
                    formData.checkInDate
                      ? new Date(formData.checkInDate).toLocaleDateString()
                      : "Not specified"
                  }
                />
              </div>
              <div className="col-span-1">
                <DetailRow
                  label="Check-out Date"
                  value={
                    formData.checkOutDate
                      ? new Date(formData.checkOutDate).toLocaleDateString()
                      : "Not specified"
                  }
                />
              </div>
              <div className="col-span-1">
                <DetailRow
                  label="Price per night"
                  value={`₦${pricePerNight.toLocaleString()}`}
                />
              </div>
              <div className="col-span-1">
                <DetailRow
                  label="Total Amount"
                  value={`₦${getTotalAmount().toLocaleString()}`}
                />
              </div>
            </div>

            

            {formData.bookingInstruction && (
              <div className="mt-4">
                <DetailRow
                  label="Special Instructions"
                  value={formData.bookingInstruction}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              text={loading ? "Processing..." : "Confirm Booking"}
              onClick={handleConfirm}
              className="w-full"
              disabled={loading}
            />
          </div>
        </div>
        <Footer/>
      </BackFormContainer>
    </IonPage>
  );
};

export default BookingStepTwo;
