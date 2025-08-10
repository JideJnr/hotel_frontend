import { useParams } from "react-router-dom";
import { IonPage } from "@ionic/react";
import Button from "../../../../components/button/button";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";

import { useEffect } from "react";
import { useCustomer } from "../../../../contexts/data/CustomerContext";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { fetchCustomer , customer } = useCustomer();
  useEffect(() => {
    fetchCustomer(id)
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

  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer title="User Details" subtitle="" className="max-w-2xl">
        <div className="w-full flex flex-col  gap-8 text-gray-800">



          {/* Profile Image and Basic Info */}
          <div className="flex items-center gap-6">
            {data.userImg ? (
              <img
                className="w-20 h-20 rounded-full object-cover border"
                src={data.userImg}
                alt={data.clientName}
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 border text-gray-600 font-bold text-xl uppercase">
                {data.userInitial}
              </div>
            )}

            <div className="flex flex-col text-sm gap-1">
              <h2 className="text-2xl font-semibold">{data.name}</h2>
              <span>{data.phone}</span>
            </div>
          </div>

                    <div className="text-black">
            <button>
              Edit
            </button>
            <button className="ml-2">
              contact
            </button>
          </div>

          {/* Personal Information */}
          <div className="flex flex-col gap-2">
         
            <div className="text-sm text-gray-600  px-2">
              <h3 className="text-lg font-semibold">Personal Information</h3>
             

            </div>
          </div>


          {/* Lodge History */}
          <div className="flex flex-col gap-2   px-2">
            <h3 className="text-lg font-semibold text-gray-600">Lodge History</h3>
            <div
              key={history.id}
              className="flex justify-between items-center px-4 py-2 border rounded-md text-sm"
            >
              <div>
                <p className="font-semibold">{history.roomNumber}</p>
                <p className="text-gray-500">Host: {history.hostName}</p>
              </div>
              <div className="text-xs text-gray-500">{history.date}</div>
            </div>
          </div>

                    {/* Current Guest Info */}
          {data.active && (
            <div className="flex flex-col gap-4 bg-gray-50 border rounded-lg p-4">
              <h3 className="text-lg font-semibold">Current Stay</h3>
              <div className="text-sm">
                <p className="font-semibold">{data.currentRoom.name}</p>
              </div>
              {data.status === "active" && (
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <Button text="Check Out" className="w-full" />
                </div>
              )}
            </div>
          )}

        </div>
      </BackFormContainer>
    </IonPage>
  );
};

export default UserDetails;
