import { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useIonRouter } from '@ionic/react';
import { useCustomerStore } from '../../services/stores/customerStore';

interface Customer {
  id: string;
  [key: string]: any;
}

interface CustomerContextType {
  totalCustomerCount: number;
  recentCustomers: Customer[];
  activeCustomers: Customer[]; // <-- NEW
  customers: Customer[];
  customer: Customer | null;
  loading: boolean;
  error: string | null;
  createCustomer: (payload: any) => Promise<void>;
  updateCustomer: (id: string, payload: any) => Promise<void>;
  fetchCustomers: () => Promise<void>;
  fetchCustomer: (id: string) => Promise<void>;
  fetchTotalCustomerCount: () => Promise<void>;
  fetchCustomerRegisteredToday: () => Promise<void>;
  fetchCustomerRegisterOnDate: (date:string) => Promise<void>;
  fetchCustomerRegisterOnDateRange: (startDate:string, endDate:string) => Promise<void>;
  searchCustomers: (query: string) => Promise<Response>; // <-- NEW
  fetchRecentCustomers: () => Promise<Response>; // <-- NEW
  fetchActiveCustomers: () => Promise<Response>; // <-- NEW
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useIonRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [recentCustomers, setRecentCustomers] = useState<Customer[]>([]);
  const [activeCustomers, setActiveCustomers] = useState<Customer[]>([]);
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
    getCustomerRegisteredOnDateRange: storeGetCustomerRegisteredOnDateRange,
    searchCustomer: storeSearchCustomer,
    fetchRecentCustomer: storeFetchRecentCustomer,
    fetchActiveCustomer: storeFetchActiveCustomer, // <-- bring in from zustand
  } = useCustomerStore();

  // =========================
  // WRAPPERS
  // =========================

  const wrappedCreateCustomer = async (payload: any) => {
    try {
      const response = await storeCreateCustomer(payload);
      if (response?.success && response.data) {
        toast.success('Customer created successfully');
        sessionStorage.removeItem("customerData");
        router.push(`/customer/${response?.data.id}`, 'root');
        
      } else {
        toast.error(`Creation failed: ${response.message}`);
        
      }
    } catch (error) {
      toast.error('Customer creation error');
      throw error;
    }
  };

  const wrappedUpdateCustomer = async (id: string, payload: any) => {
    try {
      const response = await storeUpdateCustomer(id, payload);
      if (response.success && response.data) {
        const updatedCustomer = response.data as Customer;
        toast.success('Customer updated successfully');
        router.push(`/customer/${updatedCustomer.id}`, 'forward');
       
      } else {
        toast.error(`Update failed: ${response.message}`);
        
      }
    } catch (error) {
      toast.error('Customer update error');
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
      throw error;
    }
  };

  const wrappedFetchTotalCustomerCount = async () => {
    try {
      const response = await storeGetTotalCustomerCount();
      if (response.success && response.data) {
        setTotalCustomerCount(response.data.count);
      } else {
        toast.error(`Failed: ${response.message}`);
      }
    } catch (error) {
      console.error('Error fetching total count:', error);
    }
  };

  const wrappedFetchTotalCustomerRegisteredOnDate = async (date: string) => {
    try {
      const response = await storeGetCustomerRegisteredOnDate(date);
      if (response.success && response.data) {
        setCustomerCount(response.data.count);
      } else {
        toast.error(`Failed: ${response.message}`);
      }
    } catch (error) {
      console.error('Error fetching customer count:', error);
    }
  };

  const wrappedFetchTotalCustomerRegisteredToday = async () => {
    try {
      const todayDate = new Date().toISOString().split("T")[0]; // real today
      const response = await storeGetCustomerRegisteredOnDate(todayDate);
      if (response.success && response.data) {
        setCustomerCount(response.data.count);
      } else {
        toast.error(`Failed: ${response.message}`);
      }
    } catch (error) {
      console.error('Error fetching today count:', error);
    }
  };

  const wrappedFetchTotalCustomerRegisteredOnDateRange = async (params: any) => {
    try {
      const response = await storeGetCustomerRegisteredOnDateRange(params);
      if (response.success && response.data) {
        setCustomerCount(response.data.count);
      } else {
        toast.error(`Failed: ${response.message}`);
      }
    } catch (error) {
      console.error('Error fetching date range count:', error);
    }
  };

  // 🔍 NEW: wrapper for searching customers
  const wrappedSearchCustomers = async (query: string) => {
    try {
      const results = await storeSearchCustomer(query);
      if (results && Array.isArray(results)) {
        setCustomers(results);
      }
      return results;
    } catch (error) {
      toast.error('Customer search error');
      throw error;
    }
  };

  const wrappedFetchRecentCustomers = async () => {
    try {
      const response = await storeFetchRecentCustomer();
       if (response.success && response.data) {
        setRecentCustomers(response.data);
      } else {
        toast.error(`Failed: ${response.message}`);
      }
     
      return response.data;
    } catch (error) {
      toast.error('Customer search error');
      throw error;
    }
  };

  const wrappedFetchActiveCustomers = async () => {
    try {
      const response = await storeFetchActiveCustomer();
      if (response.success && response.data) {
        setActiveCustomers(response.data);
      } else {
        toast.error(`Failed: ${response.message}`);
      }
      return response.data;
      
    } catch (error) {
      toast.error('Customer search error');
      throw error;
    }
  };


  const contextValue = useMemo(() => ({
    totalCustomerCount,
    recentCustomers,
    activeCustomers,
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
    fetchCustomerRegisterOnDateRange: wrappedFetchTotalCustomerRegisteredOnDateRange,
    searchCustomers: wrappedSearchCustomers,
    fetchRecentCustomers: wrappedFetchRecentCustomers,
    fetchActiveCustomers: wrappedFetchActiveCustomers,
  }), [
    customers,
    activeCustomers,
    recentCustomers,
    totalCustomerCount,
    customerCount,
    customer,
    loading,
    error,
  ]);

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
