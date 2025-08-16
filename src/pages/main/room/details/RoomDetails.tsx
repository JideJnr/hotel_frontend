import { useParams } from "react-router-dom";
import { IonPage } from "@ionic/react";
import Button from "../../../../components/button/button";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import { useRoom } from "../../../../contexts/data/RoomContext";
import { useEffect } from "react";
import { getNameInitials } from "../../../../utils/getInitials";

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();

      const { fetchRoom , currentRoom } = useRoom();
    
      useEffect(() => {
        fetchRoom(id)
      }, [id]);
    
  

  // Dummy user data
  const data = {
    name: "Olivia Benson",
    phone: "+2348012345678",
    email: "olivia.benson@example.com",
    address: "23 Admiralty Way, Lekki Phase 1, Lagos",
    active: true,
    status: "active",
    currentRoom: {
      name: "Room 204 - Sea View Suite",
    },
    userImg: "https://i.pravatar.cc/150?img=3",
    userInitial: "OB",
    clientName: "Olivia Benson",
  };

  const history = {
    id: "abc123",
    roomNumber: "Room 102",
    hostName: "John Doe",
    date: "2025-07-26",
  };

  console.log("Current Room Data:", currentRoom);

  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer title="Room Details" subtitle="" className="max-w-2xl">
        <div className="w-full flex flex-col  gap-8 text-gray-800">

          {/* Profile Image and Basic Info */}
          <div className="flex items-center gap-6">
  
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 border text-gray-600 font-bold text-xl uppercase">
                {getNameInitials(currentRoom?.name || "Room")}
              </div>
        

            <div className="flex flex-col text-sm gap-1">
              <h2 className="text-2xl font-semibold">{currentRoom?.name || "Room"}</h2>
          
            </div>
          </div>

          {/* Personal Information */}
          <div className="flex flex-col gap-2">
         
            <div className="text-sm text-gray-600 grid grid-cols-2 px-2">
             
              <DetailRow label='Short Rest' value='12th Jan 1990'/>
              <DetailRow label='Lodge' value={currentRoom?.pricePerNight}/>
              <DetailRow label='Description' value={currentRoom?.status || "Available"} />
            </div>
          </div>

                
            <div className="flex flex-col gap-4 bg-gray-50 border rounded-lg p-4">
              <h3 className="text-lg font-semibold">Current Stay</h3>
              <div className="text-sm flex items-center gap-4">
                <span className="flex w-8 h-8 flex-shrink-0 justify-center items-center size-4 bg-white border border-gray-200 text-[10px] font-semibold uppercase text-gray-600 rounded-full ">
                            {getNameInitials(currentRoom?.activeCustomer?.name|| "Guest")}
              </span>
                <p className="font-semibold">{currentRoom?.activeCustomer?.name}</p>
              </div>
              {data.status === "active" && (
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <Button text="Check Out" className="w-full" />
                </div>
              )}
            </div>
       


          {/* Lodge History */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Booking History</h3>
            {currentRoom?.bookings?.map((booking, index) => (
            <div
              key={index}
              className="flex gap-4 items-center px-4 py-2 border rounded-md text-sm"
            >
              <span className="flex w-10 h-10 flex-shrink-0 justify-center items-center size-4 bg-white border border-gray-200 text-[10px] font-semibold uppercase text-gray-600 rounded-full ">
                            {getNameInitials(booking?.customerName)}
              </span>
              <div>
                <p className="font-semibold">{booking.customerName|| ''}</p>
                <p className="text-gray-500">Host: {booking.tellerId}</p>
              </div>
              <div className="text-xs text-gray-500">{booking.date}</div>
            </div>)
            )}
          </div>

                    {/* Current Guest Info */}


        </div>
      </BackFormContainer>
    </IonPage>
  );
};

export default RoomDetails;
