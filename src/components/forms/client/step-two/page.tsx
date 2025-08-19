import { IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/button/button";
import { BackFormContainer, DetailRow, FormHeader } from "../..";
import { useCustomerStore } from "../../../../services/stores/customerStore";
import { useCustomer } from "../../../../contexts/data/CustomerContext";

interface CustomerData {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  userName: string
}

const ClientStepTwo = () => {
  const router = useIonRouter();
  const { createCustomer ,loading} = useCustomer();
  const [formData, setFormData] = useState<CustomerData | null>(null);
 
  const handleDataError = (message: string) => {
    toast.error(`${message}. Please start over.`);
    router.push("/register/customer/stepone", "back", "push");
  };

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



  const handleConfirm = async () => {
    if (!formData) return;
    try {

      const customerData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        userName: formData.userName
      };
      
      await createCustomer(customerData);
    } catch (err: any) {
    
    } finally {
    
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
          <DetailRow label="Username" value={formData.userName} />
          <DetailRow label="Phone Number" value={formData.phone} />
          {formData.email && <DetailRow label="Email" value={formData.email} />}
          <DetailRow label="Address" value={formData.address} />
        </div>
        
       
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