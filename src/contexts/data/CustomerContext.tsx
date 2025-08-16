import { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useIonRouter } from '@ionic/react';
import { useCustomerStore } from '../../services/stores/customerStore';

interface Customer {
  id: string;
  // Add other customer properties here
  [key: string]: any;
}



interface CustomerContextType {
  totalCustomerCount: number ;
  customers: Customer[];
  customer: Customer | null;
  loading: boolean;
  error: string | null;
  createCustomer: (payload: any) => Promise<Response>;
  updateCustomer: (id: string, payload: any) => Promise<Response>;
  fetchCustomers: () => Promise<Response>;
  fetchCustomer: (id: string) => Promise<Response>;
  fetchTotalCustomerCount: () => Promise<Response>;
  fetchCustomerRegisteredToday:() => Promise<Response>;
  fetchCustomerRegisterOnDate:() => Promise<Response>;
  fetchCustomerRegisterOnDateRange: () => Promise<Response>;


  

}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useIonRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [totalCustomerCount, setTotalCustomerCount] = useState<number>(0);
  const [customerCount, setCustomerCount] = useState<number>(0);
  
  
  const {
    loading,
    error,
    createCustomer: storeCreateCustomer,
    updateCustomer: storeUpdateCustomer,
    fetchCustomer: storeFetchCustomers,
    getCustomerById: storeGetCustomerById,
    getTotalCustomerCount: storeGetTotalCustomerCount,
    getCustomerRegisteredOnDate: storeGetCustomerRegisteredOnDate,
    getCustomerRegisteredOnDateRange: storeGetCustomerRegisteredOnDateRange
  } = useCustomerStore();

  const wrappedCreateCustomer = async (payload: any) => {
    try {
      const response = await storeCreateCustomer(payload);
      console.log('Customer created:', response);
      
      if (response?.success && response.data) {
      
        toast.success('Customer created successfully');
        sessionStorage.removeItem("customerData");
        router.push(`/customer/${response?.data.id}`, 'forward');
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
      if (response?.success && response?.data) {
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

  const wrappedFetchTotalCustomerCount = async () => {
    try {
      const response = await storeGetTotalCustomerCount();
      if (response.success && response.data) {
        const totalCustomerCount = response.data.count;
        setTotalCustomerCount(totalCustomerCount);
      } else {
        toast.error(`Creation failed: ${response.message}`);
       
      }
    } catch (error) {
     
      console.error('Creation error:', error);
   
    }
  };

  const wrappedFetchTotalCustomerRegisteredOnDate = async (date: string) => {
    try {
      const response = await storeGetCustomerRegisteredOnDate(date);
      if (response.success && response.data) {
        const customerCount = response.data.count;
        setCustomerCount(customerCount);
      } else {
        toast.error(`Creation failed: ${response.message}`);
       
      }
    } catch (error) {
     
      console.error('Creation error:', error);
   
    }
  };

  const wrappedFetchTotalCustomerRegisteredToday = async () => {
    try {
      const todayDate = 't'
      const response = await storeGetCustomerRegisteredOnDate(todayDate);
      if (response.success && response.data) {
        const customerCount = response.data.count;
        setCustomerCount(customerCount);
      } else {
        toast.error(`Creation failed: ${response.message}`);
       
      }
    } catch (error) {
     
      console.error('Creation error:', error);
   
    }
  };

  const wrappedFetchTotalCustomerRegisteredOnDateRange = async (params: any) => {
    try {
      const response = await storeGetCustomerRegisteredOnDateRange(params);
      if (response.success && response.data) {
        const customerCount = response.data.count;
        setCustomerCount(customerCount);
      } else {
        toast.error(`Creation failed: ${response.message}`);
       
      }
    } catch (error) {
     
      console.error('Creation error:', error);
   
    }
  };

  const contextValue = useMemo(() => ({
    totalCustomerCount,
    customers,
    customer,
    loading,
    error,
    createCustomer: wrappedCreateCustomer,
    updateCustomer: wrappedUpdateCustomer,
    fetchCustomers: wrappedFetchCustomers,
    fetchCustomer: wrappedFetchCustomer,
    fetchTotalCustomerCount: wrappedFetchTotalCustomerCount,
    fetchCustomerRegisteredToday: wrappedFetchTotalCustomerRegisteredToday,
    fetchCustomerRegisterOnDate: wrappedFetchTotalCustomerRegisteredOnDate,
    fetchCustomerRegisterOnDateRange: wrappedFetchTotalCustomerRegisteredOnDateRange


  }), [customers,totalCustomerCount,customerCount, customer, loading, error]);

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