import { useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/button/button";
import { useCustomerStore } from "../../../../stores/CustomerStore";


const CustomerStepTwo  = () => {
  const router = useIonRouter();
  const { createCustomer } = useCustomerStore();
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Retrieve data from sessionStorage on component mount
  useEffect(() => {
    const storedData = sessionStorage.getItem("customerData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    } else {
      toast.error("No customer data found. Please start over.");
      router.push("/register/customer/stepone", "back", "push");
    }
  }, []);

  const handleBack = () => {
    router.push("/register/customer/stepone", "back", "push");
  };

  const handleConfirm = async () => {
    if (!formData) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Prepare customer data for API
      const customerData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || undefined, // Make optional
        address: formData.address
      };
      
      await createCustomer(customerData);
      
      // Clear session storage after successful creation
      sessionStorage.removeItem("customerData");
      
      toast.success("Customer created successfully!");
      router.push("/customers", "forward", "replace");
    } catch (err: any) {
      setError(err.message || "Failed to create customer");
      toast.error("Failed to create customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading customer data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Confirm Customer Details</h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-500 text-sm">Full Name</p>
          <p className="font-medium text-lg">{formData.fullName}</p>
        </div>
        
        <div>
          <p className="text-gray-500 text-sm">Phone Number</p>
          <p className="font-medium text-lg">{formData.phone}</p>
        </div>
        
        {formData.email && (
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium text-lg">{formData.email}</p>
          </div>
        )}
        
        <div>
          <p className="text-gray-500 text-sm">Address</p>
          <p className="font-medium text-lg">{formData.address}</p>
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
          text={loading ? "Creating Customer..." : "Confirm and Create"} 
          onClick={handleConfirm}
          disabled={loading}
        />
        <Button 
          text="Back to Edit" 
          onClick={handleBack}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default CustomerStepTwo;