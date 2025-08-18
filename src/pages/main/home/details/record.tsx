import { useParams } from "react-router-dom";
import { IonPage } from "@ionic/react";
import Button from "../../../../components/button/button";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import { useRecord } from "../../../../contexts/data/RecordContext";
import { useEffect } from "react";
import { useExpenses } from "../../../../contexts/data/ExpensesContext";
import { getNameInitials } from "../../../../utils/getInitials";
import { formatDate } from "../../../../utils/utilities";
import Footer from "../../../../components/footer/footer";
import { toast } from "react-toastify";
import { formatNaira } from "../../../../utils/formatNaira";

const RecordDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchRecord , checkOutRecord ,record } = useRecord();


  useEffect(() => {
    fetchRecord(id)
  }, [id]);

    const handleCheckout = async () => {
      if (!record?.active) return;
  
      try {
        const res = await checkOutRecord(record.id); // call context checkout
        if (res?.success) {  
          fetchRecord(id)
        } else {
          toast.error(res?.message || "Checkout failed");
        }
      } catch (err) {
        toast.error("Checkout failed");
      }
    };



  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer title="Record Details" subtitle="" className="max-w-2xl">
        <div className="w-full flex flex-col  gap-8 text-gray-800 capitalize">

          {/* Profile Image and Basic Info */}
          <div className="flex items-center gap-6">
  
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 border text-gray-600 font-bold text-xl uppercase">
                {getNameInitials(record?.customerName || "Guest")}
              </div>
        

            <div className="flex flex-col text-sm gap-1">
              <h2 className="text-2xl font-semibold">Room {record?.roomName || "Guest"}</h2>
          
            </div>
          </div>

            {record && record.active && 
       
                            
            <div className="flex flex-col gap-4 bg-gray-50 border rounded-lg p-4">
              <h3 className="text-lg font-semibold">Current Stay</h3>
              <div className="text-sm flex items-center gap-4">
                <span className="flex w-8 h-8 flex-shrink-0 justify-center items-center size-4 bg-white border border-gray-200 text-[10px] font-semibold uppercase text-gray-600 rounded-full ">
                            {getNameInitials(record?.customerName|| "Guest")}
              </span>
                <p className="font-semibold text-lg">{record?.customerName|| 'Guest'}</p>
              </div>
              
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <Button text="Check Out" onClick={handleCheckout} className="w-full" />
                </div>
            
            </div>
            }

          {/* Personal Information */}
          <div className="flex flex-col gap-2">
         
            <div className="text-sm text-gray-600 grid grid-cols-1 gap-4 px-2">

              <DetailRow label='Teller' value={record?.tellerName || "N/A"} />
              <DetailRow label='Lodge Type' value={record?.requestId}/>
              <DetailRow label='Payment Method' value={record?.paymentMethodId||0}/>
              <DetailRow label='Price' value={formatNaira(record?.price||0)}/>
             
              <DetailRow label='Booking Instruction' value={record?.bookingInstructions || "N/A"} />


            </div>
          </div>

          <Footer/>




        </div>
      </BackFormContainer>
    </IonPage>
  );
};

export default RecordDetails;
