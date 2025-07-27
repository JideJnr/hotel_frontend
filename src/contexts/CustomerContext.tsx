import { createContext, useContext, ReactNode } from 'react';
import { useCustomerStore } from '../stores/customerStore';

interface CustomerContextType {

}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

const { customers, customer,createCustomer,fetchCustomers, loading, error } = useCustomerStore();

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
 
  return (
    <CustomerContext.Provider value={{
      customer,
      customers,
      createCustomer,
      fetchCustomers,
      loading,
      error
    }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) throw new Error('useCustomer must be used within an CustomerProvider');
  return context;
};
