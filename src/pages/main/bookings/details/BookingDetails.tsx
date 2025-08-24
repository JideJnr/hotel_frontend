import { useParams } from "react-router-dom";
import { IonPage, useIonRouter } from "@ionic/react";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import { useEffect } from "react";
import { getNameInitials } from "../../../../utils/getInitials";
import { useBooking } from "../../../../contexts/data/BookingContext";
import { Edit3, Phone } from "lucide-react";
import Button from "../../../../components/button/button";
import LoadingPage from "../../../../components/loading/Loading";

const BookingDetails = () => {
    const router = useIonRouter();
  
  const { id } = useParams<{ id: string }>();
  const { fetchBookingById , booking , cancelBooking , loading} = useBooking();

  useEffect(() => {
    fetchBookingById(id);
  }, [id]);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  


  return (
    <IonPage>
      {loading && (
        <LoadingPage/>
      )}
      <FormHeader /> 
      <BackFormContainer title="Booking Details" subtitle="" className="max-w-2xl h-full">
        <div className="w-full h-full flex flex-col gap-8 text-gray-800">
          {/* Profile Image and Basic Info */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 border text-gray-600 font-bold text-xl uppercase">
              {getNameInitials('Room')}
            </div>
            <div className="flex flex-col text-sm gap-1">
              <h2 className="text-2xl font-semibold">   {booking?.roomName || ''}</h2>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full">
            {/* Edit Button (secondary / gray outline) */}
            <a className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-800 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition w-1/2"
            
            >
              <Edit3 size={16} />
              Confirm
            </a>

            {/* Contact Button (primary / filled blue) */}
            <a
   
              className="flex items-center justify-center gap-2 px-4 py-2 text-black border border-gray-800 rounded-lg text-sm font-medium hover:bg-blue-700 transition w-1/2"
            >
              <Phone size={16} />
              Cancel
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-600 grid grid-cols-1 gap-4 px-2">
              <DetailRow label='Check-In Date' value={(booking?.checkInDate)||'-'}/>
              <DetailRow label='Check Out Date' value={booking?.checkOutDate||'-'}/>
              <DetailRow label='Price Per Night' value={booking?.priceTwoHours||'-'} />
              <DetailRow label='Attendant' value={booking?.userName||'-'}/>
              <DetailRow label='Customer Name' value={booking?.customerName||'-'}/>
              <DetailRow label='Status' value={booking?.status||'-'}/>
            </div>
          </div>
          
        </div>
      </BackFormContainer>
    </IonPage>
  );
};

export default BookingDetails;
