import { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useIonRouter } from '@ionic/react';
import { useCustomerStore } from '../../services/stores/customerStore';

interface Customer {
  id: string;
  // Add other customer properties here
  [key: string]: any;
}

interface CustomerResponse {
  success: boolean;
  message?: string;
  data?: Customer | Customer[];
}

interface CustomerContextType {
  customers: Customer[];
  customer: Customer | null;
  loading: boolean;
  error: string | null;
  createCustomer: (payload: any) => Promise<CustomerResponse>;
  updateCustomer: (id: string, payload: any) => Promise<CustomerResponse>;
  fetchCustomers: () => Promise<void>;
  fetchCustomer: (id: string) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useIonRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  
  const {
    loading,
    error,
    createCustomer: storeCreateCustomer,
    updateCustomer: storeUpdateCustomer,
    fetchCustomer: storeFetchCustomers,
    getCustomerById: storeGetCustomerById,
  } = useCustomerStore();

  const wrappedCreateCustomer = async (payload: any) => {
    try {
      const response = await storeCreateCustomer(payload);
      console.log('Customer created:', response);
      
      if (response.success && response.data) {
        const newCustomer = response.data as Customer;
        setCustomers(prev => [...prev, newCustomer]);
        setCustomer(newCustomer);
        toast.success('Customer created successfully');
        sessionStorage.removeItem("customerData");
        router.push(`/customer/${newCustomer.id}`, 'forward');
        return response;
      } else {
        toast.error(`Creation failed: ${response.message}`);
        return response;
      }
    } catch (error) {
      toast.error('Customer creation error');
      console.error('Creation error:', error);
      throw error;
    }
  };

  const wrappedUpdateCustomer = async (id: string, payload: any) => {
    try {
      const response = await storeUpdateCustomer(id, payload);
      if (response.success && response.data) {
        const updatedCustomer = response.data as Customer;
        setCustomers(prev => 
          prev.map(c => c.id === id ? updatedCustomer : c)
        );
        setCustomer(updatedCustomer);
        toast.success('Customer updated successfully');
        router.push(`/customer/${updatedCustomer.id}`, 'forward');
        return response;
      } else {
        toast.error(`Update failed: ${response.message}`);
        return response;
      }
    } catch (error) {
      toast.error('Customer update error');
      console.error('Update error:', error);
      throw error;
    }
  };

  const wrappedFetchCustomers = async () => {
    try {
      const response = await storeFetchCustomers();
      if (response.success && response.data) {
        setCustomers(response.data as Customer[]);
      }
    } catch (error) {
      toast.error('Failed to fetch customers');
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const wrappedFetchCustomer = async (id: string) => {
    try {
      const response = await storeGetCustomerById(id);
      if (response.success && response.data) {
        setCustomer(response.data as Customer);
      }
    } catch (error) {
      toast.error(`Failed to fetch customer ${id}`);
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const contextValue = useMemo(() => ({
    customers,
    customer,
    loading,
    error,
    createCustomer: wrappedCreateCustomer,
    updateCustomer: wrappedUpdateCustomer,
    fetchCustomers: wrappedFetchCustomers,
    fetchCustomer: wrappedFetchCustomer,
  }), [customers, customer, loading, error]);

  return (
    <CustomerContext.Provider value={contextValue}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) throw new Error('useCustomer must be used within a CustomerProvider');
  return context;
};