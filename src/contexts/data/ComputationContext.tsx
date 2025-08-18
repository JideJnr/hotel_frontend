import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import { useComputationStore } from "../../services/stores/computationStore";

interface ComputationContextType {
  balance: number | null;
  recordCount: number | null;
  totalRoomCount: number | null;
  activeRoomCount: number | null;
  totalCustomerCount: number | null;
  activeCustomerCount: number | null;
  newCustomerCount: number | null;
  expensesCount: number | null;
  loading: boolean;
  error: string | null;

  fetchRecordCountOnDate: (date: string) => Promise<void>;
  fetchRecordCountForDateRange: (range: any) => Promise<void>;
  fetchActiveRoomsCount: () => Promise<void>;
  fetchTotalRoomsCount: () => Promise<void>;
  fetchActiveCustomersCount: () => Promise<void>;
  fetchTotalCustomersCount: () => Promise<void>;
  fetchNewCustomersOnDateCount: (date: string) => Promise<void>;
  fetchNewCustomersOnDateRangeCount: () => Promise<void>;
  fetchExpensesCountOnDate: (date: string) => Promise<void>;
  fetchExpensesCountOnDateRange: (range: any) => Promise<void>;
  fetchBalanceOnDate: (date: string) => Promise<void>;
  fetchBalanceOnDateRange: (range: any) => Promise<void>;
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
    fetchRecordCountForDate,
    fetchRecordCountForDateRange,
    fetchActiveRoomCount,
    fetchAllRoomCount,
    fetchAllCustomerCount,
    fetchCustomerRegisteredOnDate,
    getCustomerRegisteredOnDateRange,
    fetchActiveCustomerCount,
    fetchExpensesCountOnDate,
    fetchExpensesCountOnDateRange,
    fetchBalanceOnDate,
    fetchBalanceOnDateRange,
  } = useComputationStore();

  // ---- WRAPPERS ----
  const wrappedFetchRecordCountForDate = useCallback(async (date: string) => {
    const res = await fetchRecordCountForDate(date);
    setRecordCount(res?.data?.count || 0);
  }, [fetchRecordCountForDate]);

  const wrappedFetchRecordCountForDateRange = useCallback(async (range: any) => {
    const res = await fetchRecordCountForDateRange(range);
    setRecordCount(res?.data?.count || 0);
  }, [fetchRecordCountForDateRange]);

  const wrappedFetchActiveRooms = useCallback(async () => {
    const res = await fetchActiveRoomCount();
    setActiveRoomCount(res?.data?.count || 0);
  }, [fetchActiveRoomCount]);

  const wrappedFetchTotalRooms = useCallback(async () => {
    const res = await fetchAllRoomCount();
    setTotalRoomCount(res?.data?.count || 0);
  }, [fetchAllRoomCount]);

  const wrappedFetchActiveCustomers = useCallback(async () => {
    const res = await fetchActiveCustomerCount();
    setActiveCustomerCount(res?.data?.count || 0);
  }, [fetchActiveCustomerCount]);

  const wrappedFetchNewCustomersOnDateCount = useCallback(async (date: string) => {
    const res = await fetchCustomerRegisteredOnDate(date);
    setNewCustomerCount(res?.data?.count || 0);
  }, [fetchCustomerRegisteredOnDate]);

  const wrappedFetchNewCustomersOnDateRangeCount = useCallback(async () => {
    const res = await getCustomerRegisteredOnDateRange();
    setTotalCustomerCount(res?.data?.count || 0);
  }, [getCustomerRegisteredOnDateRange]);

  const wrappedFetchExpensesOnDate = useCallback(async (date: string) => {
    const res = await fetchExpensesCountOnDate(date);
    setExpensesCount(res?.data?.count || 0);
  }, [fetchExpensesCountOnDate]);

  const wrappedFetchExpensesOnDateRange = useCallback(async (range: any) => {
    const res = await fetchExpensesCountOnDateRange(range);
    setExpensesCount(res?.data?.count || 0);
  }, [fetchExpensesCountOnDateRange]);

  const wrappedFetchBalanceOnDate = useCallback(async (startDate: string) => {
    const res = await fetchBalanceOnDate(startDate);
    setBalance(res?.data?.totalBalance || 0);
  }, [fetchBalanceOnDate]);

  const wrappedFetchBalanceOnDateRange = useCallback(async (range: any) => {
    const res = await fetchBalanceOnDateRange(range);
    setBalance(res?.data?.totalBalance || 0);
  }, [fetchBalanceOnDateRange]);

  const wrappedFetchTotalCustomers = useCallback(async () => {
    const res = await fetchAllCustomerCount();
    setTotalCustomerCount(res?.data?.count || 0);
  }, [fetchAllCustomerCount]);

  // ---- PROVIDER ----
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
        fetchRecordCountOnDate: wrappedFetchRecordCountForDate,
        fetchRecordCountForDateRange: wrappedFetchRecordCountForDateRange,
        fetchActiveRoomsCount: wrappedFetchActiveRooms,
        fetchTotalRoomsCount: wrappedFetchTotalRooms,
        fetchActiveCustomersCount: wrappedFetchActiveCustomers,
        fetchTotalCustomersCount: wrappedFetchTotalCustomers,
        fetchNewCustomersOnDateCount: wrappedFetchNewCustomersOnDateCount,
        fetchNewCustomersOnDateRangeCount: wrappedFetchNewCustomersOnDateRangeCount,
        fetchExpensesCountOnDate: wrappedFetchExpensesOnDate,
        fetchExpensesCountOnDateRange: wrappedFetchExpensesOnDateRange,
        fetchBalanceOnDate: wrappedFetchBalanceOnDate,
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
