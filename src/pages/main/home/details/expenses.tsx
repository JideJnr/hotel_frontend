import { useParams } from "react-router-dom";
import { IonPage } from "@ionic/react";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import { useEffect } from "react";
import { useExpenses } from "../../../../contexts/data/ExpensesContext";
import Footer from "../../../../components/footer/footer";
import { getNameInitials } from "../../../../utils/getInitials";
import { formatNaira } from "../../../../utils/formatNaira";

const ExpensesDetails = () => {
  const { id } = useParams<{ id: string }>();  
  const { fetchExpense , expense } = useExpenses();
  
  useEffect(() => {
      fetchExpense(id)
  }, [id]);


  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer title="Expenses Details" subtitle="" className="max-w-2xl">
        <div className="w-full flex flex-col  gap-8 text-gray-800 capitalize">

          {/* Profile Image and Basic Info */}
          <div className="flex items-center gap-4">
  
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 border text-gray-600 font-bold text-xl uppercase">
                {getNameInitials(expense?.tellerName || "Guest")}
              </div>
        

            <div className="flex flex-col text-sm gap-1">
              <h2 className="text-xl font-semibold">{expense?.tellerName}</h2>
          
            </div>
          </div>

          {/* Personal Information */}
          <div className="flex flex-col gap-2">
         
            <div className="text-sm text-gray-600 flex flex-col gap-2 px-2">
             
              <DetailRow label='Amount' value={formatNaira(expense?.amount||0)}/>
              <DetailRow label='Category' value={expense?.category||'-'}/>
              <DetailRow label='Description' value={expense?.category||'-'}/>
              <DetailRow label='Date' value='Date'/>
            </div>

          
          </div>

          <Footer/>
        </div>
      </BackFormContainer>
    </IonPage>
  );
};

export default ExpensesDetails;
