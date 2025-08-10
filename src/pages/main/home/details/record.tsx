import { useParams } from "react-router-dom";
import { IonPage } from "@ionic/react";
import Button from "../../../../components/button/button";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import { useRecord } from "../../../../contexts/data/RecordContext";
import { useEffect } from "react";
import { useExpenses } from "../../../../contexts/data/ExpensesContext";

const RecordDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  const { fetchRecord , record } = useRecord();
        useEffect(() => {
          fetchRecord(id)
        }, [id]);

      
  const data = {
    name: "Olivia Benson",
    phone: "+2348012345678",
    email: "olivia.benson@example.com",
    address: "23 Admiralty Way, Lekki Phase 1, Lagos",
    active: true,
    status: "active",
    currentRecord: {
      name: "Record 204 - Sea View Suite",
    },
    userImg: "https://i.pravatar.cc/150?img=3",
    userInitial: "OB",
    clientName: "Olivia Benson",
  };


  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer title="Record Details" subtitle="" className="max-w-2xl">
        <div className="w-full flex flex-col  gap-8 text-gray-800">

          {/* Profile Image and Basic Info */}
          <div className="flex items-center gap-6">
  
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 border text-gray-600 font-bold text-xl uppercase">
                {data.userInitial}
              </div>
        

            <div className="flex flex-col text-sm gap-1">
              <h2 className="text-2xl font-semibold">{data.name}</h2>
          
            </div>
          </div>

                              {/* Current Guest Info */}
          {data.active && (
            <div className="flex  bg-gray-50 border rounded-lg p-4">
              <h3 className="text-lg font-semibold h-fit my-auto">Active</h3>
              {data.status === "active" && (
                <div className="  ml-auto ">
                  <Button text="Check Out" className="w-full" />
                </div>
              )}
            </div>
          )}


          {/* Personal Information */}
          <div className="flex flex-col gap-2">
         
            <div className="text-sm text-gray-600 grid grid-cols-2 px-2">
             
              <DetailRow label='Short Rest' value='12th Jan 1990'/>
              <DetailRow label='Lodge' value='Nigerian'/>
            </div>
          </div>




        </div>
      </BackFormContainer>
    </IonPage>
  );
};

export default RecordDetails;
