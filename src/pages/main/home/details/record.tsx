import { useParams } from "react-router-dom";
import { IonPage } from "@ionic/react";
import Button from "../../../../components/button/button";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import { useRecord } from "../../../../contexts/data/RecordContext";
import { useEffect } from "react";
import { useExpenses } from "../../../../contexts/data/ExpensesContext";
import { getNameInitials } from "../../../../utils/getInitials";

const RecordDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  const { fetchRecord , record } = useRecord();
        useEffect(() => {
          fetchRecord(id)
        }, [id]);



  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer title="Record Details" subtitle="" className="max-w-2xl">
        <div className="w-full flex flex-col  gap-8 text-gray-800">

          {/* Profile Image and Basic Info */}
          <div className="flex items-center gap-6">
  
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 border text-gray-600 font-bold text-xl uppercase">
                {getNameInitials(record?.customerName || "Guest")}
              </div>
        

            <div className="flex flex-col text-sm gap-1">
              <h2 className="text-2xl font-semibold">Room {record?.roomName || "Guest"}</h2>
          
            </div>
          </div>

                              {/* Current Guest Info */}
       
            <div className="flex  bg-gray-50 border rounded-lg p-4">
              <h3 className="text-lg font-semibold h-fit my-auto">Active</h3>
             
                <div className="  ml-auto ">
                  <Button text="Check Out" className="w-full" />
                </div>
            
            </div>
      

          {/* Personal Information */}
          <div className="flex flex-col gap-2">
         
            <div className="text-sm text-gray-600 grid grid-cols-2 gap-4 px-2">

             <DetailRow label='Teller' value={record?.tellerName || "N/A"} />
              <DetailRow label='Lodge Type' value='12th Jan 1990'/>
              <DetailRow label='Payment Method' value={record?.price||0}/>
              <DetailRow label='Price' value={record?.price||0}/>
              <DetailRow label='Check In Date ' value={record?.checkInDate || "N/A"} />
              <DetailRow label='Check Out Date' value={record?.checkOutDate || "N/A"} />
              <DetailRow label='Booking Instruction' value={record?.bookingInstructions || "N/A"} />


            </div>
          </div>




        </div>
      </BackFormContainer>
    </IonPage>
  );
};

export default RecordDetails;
