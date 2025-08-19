import { useParams } from "react-router-dom";
import { IonPage, useIonRouter } from "@ionic/react";
import Button from "../../../../components/button/button";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import { useEffect } from "react";
import { getNameInitials } from "../../../../utils/getInitials";
import Footer from "../../../../components/footer/footer";
import { Edit3, Phone } from "lucide-react";
import { useStaff } from "../../../../contexts/data/StaffContext";

const UserDetails = () => {
  const router = useIonRouter();
  const { id } = useParams<{ id: string }>();

  const { fetchStaff , staff } = useStaff();
    useEffect(() => {
      fetchStaff(id)
    }, [id]);

  const salary = staff?.salary || [];


  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer title="User Details" subtitle="" className="max-w-2xl">
        <div className="w-full flex flex-col  gap-8 text-gray-800 capitalize">

            {/* Profile Image and Basic Info */}
            <div className="flex items-center gap-6">
              {staff?.userImg ? (
                <img
                  className="w-20 h-20 rounded-full object-cover border"
                  src={staff?.userImg}
                  alt={staff?.fullName}
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 border text-gray-600 font-bold text-xl uppercase">
                  {getNameInitials(staff?.fullName||'guest' )}
                </div>
              )}

              <div className="flex flex-col text-sm gap-1">
                <h2 className="text-2xl font-semibold capitalize">{staff?.fullName}</h2>
                <span>{staff?.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full" >
              <a
                href={`tel:+234${staff?.phone}`}
                className="flex items-center justify-center gap-2 px-4 py-2 text-black border border-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100  transition w-1/2"
              >
                <Phone size={16} />
                Contact
              </a>
              
              <a className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-800 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition w-1/2">
                <Edit3 size={16} />
                Analytics
              </a>
            </div>

            <div className="flex flex-col gap-2">         
              <div className="text-sm text-gray-600  px-2 flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                  <DetailRow label="Username" value={staff?.userName || 0} />
                  <DetailRow label="Email" value={staff?.email||0} />
                  <DetailRow label="Address " value={staff?.address || 0} />
                  <DetailRow label="Created At" value={staff?.email|| 0} />
              

              </div>
            </div>

            {staff?.active && (
              <div className="flex flex-col gap-4 bg-gray-50 border rounded-lg p-4">
                <h3 className="text-lg font-semibold">Current Stay</h3>
                <div className="text-sm">
                  <p className="font-semibold">{staff?.currentRoom?.name}</p>
                </div>
          
                <div className="grid grid-cols-1 gap-2 mt-2">
                    <Button text="Check Out" className="w-full" />
                </div>
                
              </div>
            )}

            {/* Lodge History */}
            <div className="flex flex-col gap-2 px-2">
              <div className="flex justify-between">
                
              <h3 className="text-lg font-semibold text-gray-600">Payment History</h3>
              <div className="flex items-center justify-center  px-2 py-1 border border-gray-800 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition w-fit">
                    ADD NEW
              </div>
              </div>

              {salary?.length > 0 ? (
                salary.map((salary:any) => (
                  <div
                    key={salary.id}
                    className="flex justify-between items-center px-4 py-2 border rounded-md text-sm"
                  >
                    <div>
                      <p className="font-semibold">Room {salary.name}</p>
                      <p className="text-gray-500">Host: {salary.tellerName}</p>
                    </div>
                    <div className="text-xs text-gray-500">{salary.date}</div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">No salary history yet</p>
              )}
            </div>

            <div className="flex flex-col gap-2 px-2">
               <div className="flex justify-between">
                
              <h3 className="text-lg font-semibold text-gray-600">Tasks</h3>
              <div className="flex items-center justify-center  px-2 py-1 border border-gray-800 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition w-fit">
                    ADD NEW
              </div>
              </div>
              {salary?.length > 0 ? (
                salary.map((salary:any) => (
                  <div
                    key={salary.id}
                    className="flex justify-between items-center px-4 py-2 border rounded-md text-sm"
                  >
                    <div>
                      <p className="font-semibold">Room {salary.name}</p>
                      <p className="text-gray-500">Host: {salary.tellerName}</p>
                    </div>
                    <div className="text-xs text-gray-500">{salary.date}</div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">No salary history yet</p>
              )}
            </div>

          <Footer/>
        </div>
      </BackFormContainer>
    </IonPage>
  );
};

export default UserDetails;
