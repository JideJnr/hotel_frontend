import { useParams } from "react-router-dom";
import { IonPage } from "@ionic/react";
import Button from "../../../../components/button/button";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import { useEffect } from "react";
import { useExpenses } from "../../../../contexts/data/ExpensesContext";

const ExpensesDetails = () => {
  const { id } = useParams<{ id: string }>();
  
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
  
  const { fetchExpense , expense } = useExpenses();
  
    useEffect(() => {
      fetchExpense(id)
    }, [id]);
  



  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer title="Expenses Details" subtitle="" className="max-w-2xl">
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

          {/* Personal Information */}
          <div className="flex flex-col gap-2">
         
            <div className="text-sm text-gray-600 flex flex-col gap-2 px-2">
             
              <DetailRow label='Amount' value='12th Jan 1990'/>
              <DetailRow label='Category' value='Nigerian'/>
              <DetailRow label='Description' value='Nigerian'/>
              <DetailRow label='Date' value='Nigerian'/>
            </div>

            <div>
              <img />
            </div>
          </div>


        </div>
      </BackFormContainer>
    </IonPage>
  );
};

export default ExpensesDetails;
