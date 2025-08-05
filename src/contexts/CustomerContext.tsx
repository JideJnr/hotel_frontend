import { createContext, useContext, ReactNode, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useCustomerStore } from '../services/stores/customerStore';
import { useIonRouter } from '@ionic/react';

interface Customer {
  id: string;
  // Add other customer properties here
}

interface CustomerContextType {
  customers: Customer[];
  customer: Customer | null;
  loading: boolean;
  error: string | null;
  createCustomer: (payload: any) => Promise<void>;
  updateCustomer: (id: string, payload: any) => Promise<void>;
  fetchCustomers: () => Promise<void>;
  fetchCustomer: (id: string) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = useCustomerStore();
  const { customers, customer, loading, error } = store;
  const router = useIonRouter();

  const wrappedCreateCustomer = async (payload: any) => {
    try {
      const response = await store.createCustomer(payload);
      console.log('Customer created:', response);
      if (response.success) {
        toast.success('Customer created successfully');
        sessionStorage.removeItem("customerData");
        router.push(`/customer/${response.data.id}`, 'forward')
      } else {
        toast.error(`Creation failed: ${response.message}`);
      }
    } catch (error) {
      toast.error('Customer creation error');
      console.error('Creation error:', error);
    }
  };

  const wrappedUpdateCustomer = async (id: string, payload: any) => {
    try {
      const response = await store.updateCustomer(id, payload);
      if (response.success) {
        toast.success('Customer updated successfully');
        router.push(`/customer/${response.data.id}`, 'forward')
      } else {
        toast.error(`Update failed: ${response.message}`);
      }
    } catch (error) {
      toast.error('Customer update error');
      console.error('Update error:', error);
    }
  };

  const wrappedFetchCustomers = async () => {
    try {
      await store.fetchCustomer();
    } catch (error) {
      toast.error('Failed to fetch customers');
      console.error('Fetch error:', error);
    }
  };

  const wrappedFetchCustomer = async (id: string) => {
    try {
      await store.fetchCustomer(id);
    } catch (error) {
      toast.error(`Failed to fetch customer ${id}`);
      console.error('Fetch error:', error);
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