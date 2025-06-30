import { useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/button/button";
import { useExpenseStore } from "../../../../stores/useExpenseStore";

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

  const handleBack = () => {
    router.push("/expenses/create/stepone", "back", "push");
  };

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
    <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Confirm Expense Details</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <p className="text-gray-500">Amount</p>
          <p className="font-bold text-xl">₦{parseFloat(formData.amount).toLocaleString()}</p>
        </div>
        
        <div className="flex justify-between items-center border-b pb-3">
          <p className="text-gray-500">Category</p>
          <p className="font-medium">{formData.category}</p>
        </div>
        
        <div className="flex justify-between items-center border-b pb-3">
          <p className="text-gray-500">Date</p>
          <p className="font-medium">
            {new Date(formData.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>
        
        <div>
          <p className="text-gray-500 mb-2">Description</p>
          <p className="font-medium bg-gray-50 p-3 rounded-md">
            {formData.description}
          </p>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      <div className="flex flex-col gap-3 mt-4">
        <Button 
          text={loading ? "Recording Expense..." : "Confirm and Record"} 
          onClick={handleConfirm}
          disabled={loading}
        />
        <Button 
          text="Back to Edit" 
          onClick={handleBack}
          variant="outline"
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default ExpenseStepTwo;