import { IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/button/button";
import { useCustomerStore } from "../../../../stores/customerStore";
import { BackFormContainer, DetailRow, FormContainer, FormHeader } from "../..";

interface CustomerData {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
}

const ClientStepTwo = () => {
  const router = useIonRouter();
  const { createCustomer } = useCustomerStore();
  const [formData, setFormData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("customerData");
    if (storedData) {
      try {
        setFormData(JSON.parse(storedData));
      } catch (err) {
        handleDataError("Invalid customer data format");
      }
    } else {
      handleDataError("No customer data found");
    }
  }, []);

  const handleDataError = (message: string) => {
    toast.error(`${message}. Please start over.`);
    router.push("/register/customer/stepone", "back", "push");
  };

  const handleConfirm = async () => {
    if (!formData) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const customerData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address
      };
      
      await createCustomer(customerData);
      sessionStorage.removeItem("customerData");
      toast.success("Customer created successfully!");
      router.push("/customers", "forward", "replace");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create customer";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading customer data...</p>
      </div>
    );
  }

  return (
    <IonPage>
      <FormHeader/>
      <BackFormContainer
      title="Confirm Customer Details" 
      subtitle="Please review the information before submitting"
      className="max-w-md"
    >
        <div className="space-y-6">
        <div className="space-y-4">
          <DetailRow label="Full Name" value={formData.fullName} />
          <DetailRow label="Phone Number" value={formData.phone} />
          {formData.email && <DetailRow label="Email" value={formData.email} />}
          <DetailRow label="Address" value={formData.address} />
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}
        
        <div className="flex flex-col gap-3 pt-4">
          <Button 
            text="Submit"
            onClick={handleConfirm}
            disabled={loading}
            loading={loading}
            loadingText="Submitting..."
            className="w-full"
          />
      
        </div>
        </div>
      </BackFormContainer>
    </IonPage>
  );
};

export default ClientStepTwo;