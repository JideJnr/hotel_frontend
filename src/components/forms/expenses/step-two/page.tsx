import { IonPage } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import Button from "../../../../components/button/button";

import { useIonRouter } from "@ionic/react";
import { useExpense } from "../../../../contexts/ExpensesContext";

interface FormData {
  category: {
    label: string;
    value: string;
  };
  amount: string;
  description?: string;
  receiptBase64?: string;
  paymentMethod?: string;
  reference?: string;
}

const ExpenseStepTwo = () => {
  const router = useIonRouter();
  const { createExpense } = useExpense();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadStoredData = () => {
      const storedData = sessionStorage.getItem("expenseData");
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          if (!parsedData?.category || !parsedData?.amount) {
            throw new Error("Invalid expense data");
          }
          setFormData(parsedData);
        } catch (error) {
          toast.error("Invalid expense data format");
          router.push("/expenses/create/stepone", "back", "push");
        }
      } else {
        toast.error("No expense data found. Please start over.");
        router.push("/expenses/create/stepone", "back", "push");
      }
    };

    loadStoredData();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    
    setIsSubmitting(true);

    try {
      const expensePayload = {
        category: formData.category.value,
        amount: parseFloat(formData.amount),
        description: formData.description,
        receiptURL: formData.receiptBase64,
        paymentMethod: formData.paymentMethod,
        reference: formData.reference,
        date: new Date().toISOString()
      };

      await createExpense(expensePayload);
      toast.success("Expense recorded successfully!");
      sessionStorage.removeItem("expenseData");
      router.push("/expenses", "forward", "replace");
    } catch (err: any) {
      toast.error(err?.message || "Failed to record expense");
    } finally {
      setIsSubmitting(false);
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
      <FormHeader />
      
      <BackFormContainer 
        title="Complete Expense Details" 
        subtitle="Please review the information before submitting"
        className="max-w-md"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <DetailRow label="Category" value={formData.category.label} />
            <DetailRow label="Amount" value={formData.amount} />
            {formData.description && <DetailRow label="Description" value={formData.description} />}
          </div>

          {formData.receiptBase64 && (
            <div>
              <img 
                src={formData.receiptBase64} 
                alt="Receipt preview" 
                className="mt-2 max-h-40 rounded w-full max-w-32" 
              />
            </div>
          )}
          
          <div className="flex flex-col gap-3 pt-4">
            <Button 
              text="Submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              loading={isSubmitting}
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