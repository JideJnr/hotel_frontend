import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BackFormContainer, DetailRow, FormHeader, FormInput } from "../../../../components/forms";
import Button from "../../../../components/button/button";
import { useExpenseStore } from "../../../../services/stores/expensesStore";

const ExpenseStepTwo = () => {
  const router = useIonRouter();
  const { createExpense } = useExpenseStore();

  const [formData, setFormData] = useState<any>(null);
  const [additionalData, setAdditionalData] = useState({
    paymentMethod: "",
    reference: ""
  });
  const [errors, setErrors] = useState({
    paymentMethod: "",
    reference: ""
  });

  useEffect(() => {
    const storedData = sessionStorage.getItem("expenseData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    } else {
      toast.error("No expense data found. Please start over.");
      router.push("/expenses/create/stepone", "back", "push");
    }
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      paymentMethod: additionalData.paymentMethod.trim() ? "" : "Payment method is required",
      reference: additionalData.reference.trim() ? "" : "Reference is required"
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      const completeExpense = {
        ...formData,
        ...additionalData,
        amount: parseFloat(formData.amount)
      };

      try {
        await createExpense(completeExpense); // Replace with actual API call
        toast.success("Expense recorded successfully!");
        sessionStorage.removeItem("expenseData");
        router.push("/expenses", "forward", "replace");
      } catch (err: any) {
        toast.error(err?.message || "Failed to record expense");
      }
    }
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading expense data...</p>
      </div>
    );
  }

  return (
    <IonPage>
      <FormHeader/>
    
        <BackFormContainer 
          title="Complete Expense Details" 
          subtitle="Please review the information before submitting"
          className="max-w-md"
        >
        <div className="space-y-6">
        <div className="space-y-4">
          <DetailRow label="Category" value={formData.category.label} />
          <DetailRow label="Amount" value={formData.amount} />
          {formData.description && <DetailRow label="description" value={formData.description} />}
        </div>

        <div>
                  <img src={formData.receiptBase64} alt="Preview" className="mt-2 max-h-40 rounded w-full max-w-32" />
        </div>
        

        
        <div className="flex flex-col gap-3 pt-4">
          <Button 
            text="Submit"
            onClick={handleSubmit}
            
            loadingText="Submitting..."
            className="w-full"
          />
      
        </div>
        </div>
        </BackFormContainer>
    
    </IonPage>
  );
};

export default ExpenseStepTwo;
