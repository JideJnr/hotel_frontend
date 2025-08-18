import { useParams } from "react-router-dom";
import { IonPage, useIonRouter } from "@ionic/react";
import Button from "../../../../components/button/button";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import DashboardTile from '../../../../components/templates/dashboardtiles/DashboardTiles';
import { useEffect } from "react";

import { getNameInitials } from "../../../../utils/getInitials";
import Footer from "../../../../components/footer/footer";
import { useCustomer } from "../../../../contexts/data/CustomerContext";
import { Edit3, Phone } from "lucide-react";

const UserDetails = () => {
  const router = useIonRouter();
  const { id } = useParams<{ id: string }>();

  const { fetchCustomer , customer } = useCustomer();
  useEffect(() => {
    fetchCustomer(id)
  }, [id]);

  const bookings = customer?.bookings || [];


  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer title="User Details" subtitle="" className="max-w-2xl">
        <div className="w-full flex flex-col  gap-8 text-gray-800 capitalize">

          {/* Profile Image and Basic Info */}
          <div className="flex items-center gap-6">
            {customer?.userImg ? (
              <img
                className="w-20 h-20 rounded-full object-cover border"
                src={customer?.userImg}
                alt={customer?.fullName}
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 border text-gray-600 font-bold text-xl uppercase">
                {getNameInitials(customer?.fullName||'guest' )}
              </div>
            )}

            <div className="flex flex-col text-sm gap-1"                 >
              <h2 className="text-2xl font-semibold capitalize">{customer?.fullName}</h2>
              <span>{customer?.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full" onClick={() => router.push('/register/customer/stepone', 'forward')}>
            {/* Edit Button (secondary / gray outline) */}
            <a className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-800 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition w-1/2">
              <Edit3 size={16} />
              Edit
            </a>

            {/* Contact Button (primary / filled blue) */}
            <a
              href={`tel:+234${customer?.phone}`}
              className="flex items-center justify-center gap-2 px-4 py-2 text-black border border-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100  transition w-1/2"
            >
              <Phone size={16} />
              Contact
            </a>
          </div>

          {/* Personal Information */}
          <div className="flex flex-col gap-2">
         
            <div className="text-sm text-gray-600  px-2 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Personal Information</h3>
                <DetailRow label="Username" value={customer?.userName || 0} />
                <DetailRow label="Email" value={customer?.email||0} />
                <DetailRow label="Address " value={customer?.address || 0} />
                <DetailRow label="Created At" value={customer?.email|| 0} />
             

            </div>
          </div>

          {/* Current Guest Info */}
          {customer?.active && (
            <div className="flex flex-col gap-4 bg-gray-50 border rounded-lg p-4">
              <h3 className="text-lg font-semibold">Current Stay</h3>
              <div className="text-sm">
                <p className="font-semibold">{customer?.currentRoom?.name}</p>
              </div>
         
              <div className="grid grid-cols-1 gap-2 mt-2">
                  <Button text="Check Out" className="w-full" />
              </div>
              
            </div>
          )}

          {/* Lodge History */}
          <div className="flex flex-col gap-2 px-2">
            <h3 className="text-lg font-semibold text-gray-600">Lodge History</h3>

            {bookings?.length > 0 ? (
              bookings.map((booking:any) => (
                <div
                  key={booking.id}
                  className="flex justify-between items-center px-4 py-2 border rounded-md text-sm"
                >
                  <div>
                    <p className="font-semibold">Room {booking.name}</p>
                    <p className="text-gray-500">Host: {booking.tellerName}</p>
                  </div>
                  <div className="text-xs text-gray-500">{booking.date}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">No lodge history yet</p>
            )}
          </div>


          <Footer/>


        </div>
      </BackFormContainer>
    </IonPage>
  );
};

export default UserDetails;
