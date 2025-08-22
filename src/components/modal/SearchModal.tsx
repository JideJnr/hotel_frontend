import React, { useState, useEffect, useRef } from "react";
import {
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { search, close } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import { useCustomer } from "../../contexts/data/CustomerContext";
import { FormHeader } from "../forms";




const SearchModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const router = useIonRouter();
  const { searchCustomers, searchedCustomers, loading, error } = useCustomer();

  const [inputValue, setInputValue] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (inputValue.trim().length > 2) {
      debounceRef.current = setTimeout(() => {
        searchCustomers(inputValue);
      }, 300);
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputValue]);

  const handleClearInput = () => setInputValue("");

  const handleUserSelect = (customer: any) => {
    onClose();
    router.push(`/customer/${customer.id}`, "forward");
  };

  const handleCloseModal = () => {
    onClose();
    
  };
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        {/* ✅ Consistent header */}
        <FormHeader className="mb-4 bg-white rounded-lg" />

        {/* Card container */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="px-6 py-6 space-y-5 text-gray-800">
            <div className="flex items-center border-2 border-primary rounded-md px-2">
              <IonIcon icon={search} className="text-lg mr-2 text-gray-800" />
              <IonInput
                value={inputValue}
                placeholder="Search"
                onIonInput={(e) => setInputValue(e.detail.value ?? "")}
                clearInput
              />

              {inputValue && (
              <IonIcon 
                icon={close} 
                className="text-lg ml-2" 
                
              />)}
          
            </div>

            {/* Results */}
            <div className="flex flex-col gap-3">
              {loading && (
                <div className="flex justify-center py-6 bg-white rounded-lg shadow-sm">
                  <IonSpinner name="crescent" />
                </div>
              )}

              {error && (
                <div className="bg-white rounded-lg shadow-sm text-red-500 text-center py-4">
                  {error}
                </div>
              )}

              {!loading && searchedCustomers.length > 0 && (
  <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
  {searchedCustomers.map((c) => (
    <div
      key={c.id}
      onClick={() => handleUserSelect(c)}
      className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition flex"
    >
      <div>
      <h2 className="capitalize text-black font-medium">{c.fullName}</h2>
      
      {c.email && <p className="text-gray-500">{c.email}</p>}
      </div>
      <div className="w-fit h-fit ml-auto mr-2 my-auto">
x
        </div>
    </div>
  ))}
</div>

              )}

              {!loading && inputValue.length > 2 && searchedCustomers.length === 0 && (
                <div className="  text-center py-6 text-black">
                  No customers found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </IonModal>
  );
};

export default SearchModal;
