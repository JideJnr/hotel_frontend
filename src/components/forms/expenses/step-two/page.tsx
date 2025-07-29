import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BackFormContainer, FormHeader, FormInput } from "../../../../components/forms";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdditionalData((prev) => ({ ...prev, [name]: value }));
  };

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
      <IonContent>
        <BackFormContainer 
          title="Complete Expense Details" 
          subtitle="Step 2: Payment information"
          className="max-w-2xl"
        >
          <div className="space-y-6">
            {/* Display summary from step one */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Expense Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">₦{parseFloat(formData.amount).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{formData.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(formData.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-3 pt-4">
                <Button 
                  text="Submit Expense"
                  type="submit"
                  className="w-full"
                />
                <Button 
                  text="Back"
                  onClick={() => router.push("/expenses/create/stepone", "back", "push")}
                
                  className="w-full"
                />
              </div>
            </form>
          </div>
        </BackFormContainer>
      </IonContent>
    </IonPage>
  );
};

export default ExpenseStepTwo;
