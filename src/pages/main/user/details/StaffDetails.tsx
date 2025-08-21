import { useParams } from "react-router-dom";
import { IonPage, useIonRouter } from "@ionic/react";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import { useEffect } from "react";
import { getNameInitials } from "../../../../utils/getInitials";
import Footer from "../../../../components/footer/footer";
import { Edit3, Phone } from "lucide-react";
import { useStaff } from "../../../../contexts/data/StaffContext";
import { formatDate } from "../../../../utils/utilities";
import LoadingPage from "../../../../components/loading/Loading";

const UserDetails = () => {
  const router = useIonRouter();
  const { id } = useParams<{ id: string }>();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const uid = id || user.uid;

  const { fetchStaff , staff , loading } = useStaff();
    useEffect(() => {
      fetchStaff(uid)
    }, [uid]);

  const salary = staff?.salary || [];

  return (
    <IonPage>
      <FormHeader />
      {loading && (
        <LoadingPage/>
      )}
      <BackFormContainer title="" subtitle="" className="max-w-2xl">
        <div className="w-full flex flex-col  gap-8 text-gray-800 capitalize">

            {/* Profile Image and Basic Info */}
            <div className="flex items-center gap-4">
              {staff?.userImg ? (
                <img
                  className="w-20 h-20 rounded-full object-cover border"
                  src={staff?.userImg}
                  alt={staff?.fullName}
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 border text-gray-600 font-bold text-xl uppercase">
                  {getNameInitials(staff?.fullName||'guest' )}
                </div>
              )}

              <div className="flex flex-col text-sm gap-1">
                <h2 className="text-xl font-semibold capitalize">{staff?.fullName}</h2>
                <span>{staff?.phone}</span>
              </div>
            </div>

            {id && 

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
            </div> }

            <div className="flex flex-col gap-2">         
              <div className="text-sm text-gray-600  px-2 flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                  <DetailRow label="FullName" value={staff?.fullName || 0} />
                  <DetailRow label="Email" value={staff?.email||0} />
                  <DetailRow label="Address " value={staff?.address || 0} />
                  <DetailRow label="Created At" value={formatDate(staff?.createdAt)|| '-'} />
              

              </div>
            </div>

            {/* Lodge History */}
            <div className="flex flex-col gap-2 px-2">
              <div className="flex justify-between">
                  
                <h3 className="text-lg font-semibold text-gray-600">Payment History</h3>
                {id && 
                <div className="flex items-center justify-center  px-2 py-1 border border-gray-800 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition w-fit"
                onClick={() => router.push(`/expenses/new?staffId=${id}`)}>
                      ADD NEW
                </div>}

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
