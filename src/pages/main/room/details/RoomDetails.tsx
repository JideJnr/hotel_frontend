import { useParams } from "react-router-dom";
import { IonPage, useIonRouter } from "@ionic/react";
import Button from "../../../../components/button/button";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import { useRoom } from "../../../../contexts/data/RoomContext";
import { useEffect } from "react";
import { getNameInitials } from "../../../../utils/getInitials";
import Footer from "../../../../components/footer/footer";
import { useRecord } from "../../../../contexts/data/RecordContext";
import { toast } from "react-toastify";
import { Edit3, Phone } from "lucide-react";
import { formatNaira } from "../../../../utils/formatNaira";

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { fetchRoom , currentRoom } = useRoom();
  const { checkOutRecord } = useRecord();
  const router = useIonRouter();
  useEffect(() => {
    fetchRoom(id);
  }, [id]);

  const handleCheckout = async () => {
    if (!currentRoom?.activeCustomer) return;

    try {
      const res = await checkOutRecord(currentRoom.activeCustomer.recordId); // call context checkout
      if (res?.success) {
       
        fetchRoom(id); // refresh room to clear active customer
      } else {
        toast.error(res?.message || "Checkout failed");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Checkout failed");
    }
  };
    
  return (
    <IonPage>
      <FormHeader /> 
      <BackFormContainer title="Room Details" subtitle="" className="max-w-2xl h-full">
        <div className="w-full h-full flex flex-col gap-8 text-gray-800 capitalize">

          {/* Profile Image and Basic Info */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 border text-gray-600 font-bold text-xl uppercase">
              {getNameInitials(currentRoom?.name || "Room")}
            </div>

            <div className="flex flex-col text-sm gap-1">
              <h2 className="text-2xl font-semibold">Room {currentRoom?.name || ""}</h2>
            </div>
          </div>

          {user && user.role == 'ADMIN' && 

          <div className="flex items-center gap-4 w-full" onClick={() => router.push('/register/room/stepone', 'forward')}>
            {/* Edit Button (secondary / gray outline) */}
            <a className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-800 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition w-1/2">
              <Edit3 size={16} />
              Update
            </a>

            {/* Contact Button (primary / filled blue) */}
            <a
              onClick={() => router.push('/register/customer/stepone', 'forward')}
              className="flex items-center justify-center gap-2 px-4 py-2 text-black border border-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100  transition w-1/2"
            >
              <Phone size={16} />
              Analysis
            </a>
          </div>}

          {/* Personal Information */}
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-600 grid grid-cols-1 gap-4 px-2">
              <DetailRow label='Description' value={currentRoom?.description||'-'}/>
              <DetailRow label='Short Rest (One Hour)' value={formatNaira(currentRoom?.priceOneHour||0)}/>
              <DetailRow label='Short Rest (Two Hours)' value={formatNaira(currentRoom?.priceTwoHours||0)} />
              <DetailRow label='Overnight' value={formatNaira(currentRoom?.pricePerNight||0)}/>
            </div>
          </div>

          {currentRoom && currentRoom.active &&
            <div className="flex flex-col gap-4 bg-gray-50 border rounded-lg p-4">
              <h3 className="text-lg font-semibold">Current Stay</h3>
              <div className="text-sm flex items-center gap-4">
                <span className="flex w-8 h-8 flex-shrink-0 justify-center items-center bg-white border border-gray-200 text-[10px] font-semibold uppercase text-gray-600 rounded-full ">
                  {getNameInitials(currentRoom?.activeCustomer?.customerName|| "Guest")}
                </span>
                <p className="font-semibold">{currentRoom?.activeCustomer?.customerName || "Guest"}</p>
              </div>
              
              <div className="grid grid-cols-1 gap-2 mt-2">
                <Button text="Check Out" className="w-full" onClick={handleCheckout} />
              </div>
            </div>
          }

          {currentRoom?.bookings && currentRoom?.bookings.length > 0 &&
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Room History</h3>
              {currentRoom?.bookings?.map((booking:any, index:any) => (
                <div
                  key={index}
                  className="flex gap-4 items-center px-4 py-2 border rounded-md text-sm"
                >
                  <span className="flex w-10 h-10 flex-shrink-0 justify-center items-center bg-white border border-gray-200 text-[10px] font-semibold uppercase text-gray-600 rounded-full ">
                    {getNameInitials(booking?.customerName)}
                  </span>
                  <div>
                    <p className="font-semibold">{booking.customerName || ''}</p>
                    <p className="text-gray-500"> {booking.tellerName}</p>
                  </div>
                  <div className="text-xs text-gray-500 ml-auto mr-2">{formatNaira(booking.price)}</div>
                </div>
                
              ))}
            <div className="flex justify-between mt-4">
              <button
                className="btn-outline-light tablebutton me-2 mb-2 sm:mb-0 sm:inline block"
            
              >
                {" Previous "}
              </button>

              <button
                className="btn-outline-light tablebutton sm:inline block me-2 mb-2 sm:mb-0"
                
              >
                {" Next "}
              </button>
            </div>
            </div>
          }

          <Footer className="mt-auto" showCopyright={true} />

          
        </div>

        
      
        
      </BackFormContainer>
      
   
    </IonPage>
  );
};

export default RoomDetails;
