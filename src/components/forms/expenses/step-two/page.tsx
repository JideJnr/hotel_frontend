import { useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/button/button";
import { useExpenseStore } from "../../../../stores/expensesStore";


const ExpenseStepTwo = () => {
  const router = useIonRouter();
  const { createExpense } = useExpenseStore();
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Retrieve data from sessionStorage on component mount
  useEffect(() => {
    const storedData = sessionStorage.getItem("expenseData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    } else {
      toast.error("No expense data found. Please start over.");
      router.push("/expenses/create/stepone", "back", "push");
    }
  }, []);


  const handleConfirm = async () => {
    if (!formData) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Prepare expense data for API
      const expenseData = {
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: new Date(formData.date).toISOString(),
        // receipt would be added here if implemented
      };
      
      await createExpense(expenseData);
      
      // Clear session storage after successful creation
      sessionStorage.removeItem("expenseData");
      
      toast.success("Expense recorded successfully!");
      router.push("/expenses", "forward", "replace");
    } catch (err: any) {
      setError(err.message || "Failed to record expense");
      toast.error("Failed to record expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading expense data...</p>
      </div>
    );
  }

  return (

    <>
    Details
    </>
  );
};

export default ExpenseStepTwo;