import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import { useComputationStore } from "../../services/stores/computationStore";


interface ComputationContextType {
  newCustomerCount: number | null;
  recordCount: number | null;
  activeRoomCount: number | null;
  roomCount: number | null; 
  customerCount: number | null;
  expensesCount: number | null;
  loading: boolean;
  error: string | null;

  fetchBalance: () => Promise<void>;
  fetchActiveRooms: () => Promise<void>;
  fetchTotalRooms: () => Promise<void>;
  fetchTotalSales: () => Promise<void>;
  fetchActiveUsers: () => Promise<void>;
  fetchTotalExpenses: () => Promise<void>;
}

const ComputationContext = createContext<ComputationContextType | undefined>(undefined);

export const ComputationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [recordCount, setRecordCount] = useState<number | null>(null);
  const [totalRoomCount, setTotalRoomCount] = useState<number | null>(null);
  const [activeRoomCount, setActiveRoomCount] = useState<number | null>(null);
  const [activeCustomerCount, setActiveCustomerCount] = useState<number | null>(null);
  const [totalCustomerCount, setTotalCustomerCount] = useState<number | null>(null);
  const [newCustomerCount, setNewCustomerCount] = useState<number | null>(null);
  const [expensesCount, setExpensesCount] = useState<number | null>(null);

  const {
      loading,
      error,
      fetchRecordCountForDate: storeFetchRecordCountForDate,
      fetchRecordCountForDateRange: storeFetchRecordCountForDateRange,
      fetchActiveRoomCount: storeFetchActiveRoomCount,
      fetchAllRoomCount: storeFetchAllRoomCount,
      fetchAllCustomerCount: storeFetchAllCustomerCount,
      fetchCustomerRegisteredOnDate: storeFetchCustomerRegisteredOnDate,
      getCustomerRegisteredOnDateRange: storeFetchCustomerRegisteredOnDateRange,
      fetchActiveCustomerCount: storeFetchActiveCustomerCount,
      fetchExpensesCountOnDate: storeFetchExpensesCountOnDate,
      fetchExpensesCountOnDateRange: storeFetchExpensesCountOnDateRange,
      fetchBookingCountOnDate: storeFetchBookingCountOnDate,
      fetchBookingCountOnDateRange: storeFetchBookingCountOnDateRange,
      fetchBalanceOnDate: storeFetchBalanceOnDate,
      fetchBalanceOnDateRange: storeFetchBalanceOnDateRange,
      
  } = useComputationStore();

  const wrappedFetchRecordCountForDate = useCallback(async (date:string) => {
    try {
      const res = await storeFetchRecordCountForDate(date);
      setRecordCount(res?.data?.count || 0);
    } catch (err) {
      
    } finally {
    }
  }, []);

  const wrappedFetchRecordCountForDateRange = useCallback(async (date:string) => {
    try {
      const res = await storeFetchRecordCountForDateRange(date);
      setRecordCount(res?.data?.count || 0);
    } catch (err) {

    } finally {
    }
  
  }, []);

  const wrappedFetchActiveRooms = useCallback(async () => {
    try {
      const res = await storeFetchActiveRoomCount();
      setActiveRoomCount(res?.data.count || 0);
    } catch (err) {
    } finally {
    }
  }, []);

  const wrappedFetchTotalRooms = useCallback(async () => {
    try {
      const res = await storeFetchAllRoomCount();
      setTotalRoomCount(res?.data.count || 0);
    } catch (err) {
    } finally {
    }
  }, []);
  
  const wrappedFetchActiveCustomers = useCallback(async () => {
    try {
      const res = await storeFetchActiveCustomerCount();
      setActiveCustomerCount(res?.data.count || 0);
    } catch (err) {
    } finally {
    }
  }, []);

  const wrappedFetchNewCustomersOnDateCount = useCallback(async (date:string) => {
    try {
      const response = await storeFetchCustomerRegisteredOnDate(date);
      setNewCustomerCount( response?.data?.count);
    } catch (err) {
    } finally {
    }
  }, []);

  const wrappedFetchNewCustomersOnDateRangeCount = useCallback(async () => {
    try {
      const res = await storeFetchActiveCustomerCount();
      setActiveCustomerCount(res?.data.count || 0);
    } catch (err) {
    } finally {
    }
  }, []);

  const wrappedFetchTotalExpensesOnDateCount = useCallback(async () => {
    try {
      const res = await storeFetchExpensesCountOnDate();
      setExpensesCount(res?.data.count || 0);
    } catch (err) {
    } finally {
    }
  }, []);

  const wrappedFetchBalanceOnDate = async (date:string) => {
    try {
      const response = await storeFetchBalanceOnDate(date);
      console.log(response);
      setBalance(response?.data?.totalBalance || 0);
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };

  const wrappedFetchBalanceOnDateRange = async (payload:any) => {
    try {
      const response = await wrappedFetchRecordCountForDateRange(payload);
      setBalance(response?.data?.totalBalance || 0);

    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };

  const wrappedFetchTotalCustomers = async () => {
    try {
      const response = await storeFetchAllCustomerCount();
      setTotalCustomerCount(response?.data?.count || 0);
    } catch (err) {
      console.error("Error fetching active users:", err);
    }
  };
  
  const wrappedFetchTotalExpensesOnDate = async () => {
    try {
      await wrappedFetchTotalExpenses();
    } catch (err) {
      console.error("Error fetching total expenses:", err);
    }
  };

  return (
    <ComputationContext.Provider
      value={{
        balance,
        recordCount,
        totalRoomCount,
        activeRoomCount,
        totalCustomerCount,
        activeCustomerCount,
        expensesCount,
        newCustomerCount,
        loading,
        error,
        fetchRecordCountOnDate:wrappedFetchRecordCountForDate,
        fetchRecordCountForDateRange:wrappedFetchRecordCountForDateRange,
        fetchActiveRoomsCount: wrappedFetchActiveRooms,
        fetchTotalRoomsCount: wrappedFetchTotalRooms,
        fetchActiveCustomersCount: wrappedFetchActiveCustomers,
        fetchNewCustomersOnDateCount: wrappedFetchNewCustomersOnDateCount,
        fetchNewCustomersOnDateRangeCount: wrappedFetchNewCustomersOnDateRangeCount,
        fetchTotalCustomersCount: wrappedFetchTotalCustomers,
        fetchExpensesCountOnDate: wrappedFetchTotalExpensesOnDateCount,
        fetchBalanceOnDate: wrappedFetchBalanceOnDate,
        fetchTotalExpensesOnDate: wrappedFetchTotalExpensesOnDate,
        fetchBalanceOnDateRange: wrappedFetchBalanceOnDateRange,
      }}
    >
      {children}
    </ComputationContext.Provider>
  );
};

export const useComputation = () => {
  const context = useContext(ComputationContext);
  if (!context) throw new Error("useComputation must be used within a ComputationProvider");
  return context;
};
