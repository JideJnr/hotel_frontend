import { createContext, useContext, ReactNode, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useComputationStore } from "../../services/stores/computationStore";

interface ComputationContextType {
  totalSales: number | null;
  totalExpenses: number | null;
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
  fetchRecordCountForDateRange: (startDate:string, endDate:string) => Promise<void>;
  fetchActiveRoomsCount: () => Promise<void>;
  fetchTotalRoomsCount: () => Promise<void>;
  fetchActiveCustomersCount: () => Promise<void>;
  fetchTotalCustomersCount: () => Promise<void>;
  fetchNewCustomersOnDateCount: (date: string) => Promise<void>;
  fetchNewCustomersOnDateRangeCount: (startDate:string, endDate:string) => Promise<void>;
  fetchExpensesOnDate: (date: string) => Promise<void>;
  fetchExpensesCountOnDateRange: (startDate:string, endDate:string) => Promise<void>;
  fetchBalanceOnDate: (date: string) => Promise<void>;
  fetchBalanceOnDateRange: (startDate:string, endDate:string) => Promise<void>;
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
  const [totalExpenses, setTotalExpenses] = useState<number | null>(null);
  const [totalSales, setTotalSales] = useState<number | null>(null);

  const store = useComputationStore();

  // ---- WRAPPERS ----
  const wrappedFetchRecordCountForDate = async (date: string) => {
    try {
      const response = await store.fetchRecordCountForDate(date);
      if (response.success) {
        setRecordCount(response.data?.count || 0);
      } else {
        toast.error(`Failed: ${response.message || "Record count for date"}`);
      }
    } catch (error) {
      toast.error("Failed to fetch record count for date");
      console.error("Error:", error);
    }
  };

  const wrappedFetchRecordCountForDateRange = async (startDate:string, endDate:string) => {
    try {
      const response = await store.fetchRecordCountForDateRange(startDate, endDate);
      if (response.success) {
        setRecordCount(response.data?.count || 0);
      } else {
        toast.error(`Failed: ${response.message || "Record count for date range"}`);
      }
    } catch (error) {
      toast.error("Failed to fetch record count for date range");
      console.error("Error:", error);
    }
  };

  const wrappedFetchActiveRooms = async () => {
    try {
      const response = await store.fetchActiveRoomCount();
      if (response.success) {
        setActiveRoomCount(response.data?.count || 0);
      } else {
        toast.error(`Failed: ${response.message || "Active rooms"}`);
      }
    } catch (error) {
      toast.error("Failed to fetch active rooms");
      console.error("Error:", error);
    }
  };

  const wrappedFetchTotalRooms = async () => {
    try {
      const response = await store.fetchAllRoomCount();
      if (response.success) {
        setTotalRoomCount(response.data?.count || 0);
      } else {
        toast.error(`Failed: ${response.message || "Total rooms"}`);
      }
    } catch (error) {
      toast.error("Failed to fetch total rooms");
      console.error("Error:", error);
    }
  };

  const wrappedFetchActiveCustomers = async () => {
    try {
      const response = await store.fetchActiveCustomerCount();
      if (response.success) {
        setActiveCustomerCount(response.data?.count || 0);
      } else {
        toast.error(`Failed: ${response.message || "Active customers"}`);
      }
    } catch (error) {
      toast.error("Failed to fetch active customers");
      console.error("Error:", error);
    }
  };

  const wrappedFetchTotalCustomers = async () => {
    try {
      const response = await store.fetchAllCustomerCount();
      if (response.success) {
        setTotalCustomerCount(response.data?.count || 0);
      } else {
        toast.error(`Failed: ${response.message || "Total customers"}`);
      }
    } catch (error) {
      toast.error("Failed to fetch total customers");
      console.error("Error:", error);
    }
  };

  const wrappedFetchNewCustomersOnDateCount = async (date: string) => {
    try {
      const response = await store.fetchCustomerRegisteredOnDate(date);
      if (response.success) {
        setNewCustomerCount(response.data?.count || 0);
      } else {
        toast.error(`Failed: ${response.message || "New customers on date"}`);
      }
    } catch (error) {
      toast.error("Failed to fetch new customers on date");
      console.error("Error:", error);
    }
  };

  const wrappedFetchNewCustomersOnDateRangeCount = async (startDate:string, endDate:string) => {
    try {
      const response = await store.fetchCustomerRegisteredOnDateRange(startDate, endDate);
      if (response.success) {
        setTotalCustomerCount(response.data?.count || 0);
      } else {
        toast.error(`Failed: ${response.message || "New customers in date range"}`);
      }
    } catch (error) {
      toast.error("Failed to fetch new customers in date range");
      console.error("Error:", error);
    }
  };

  const wrappedFetchExpensesOnDate = async (date: string) => {
    try {
      const response = await store.fetchExpensesCountOnDate(date);
      if (response.success) {
        setExpensesCount(response.data?.count || 0);
        setTotalExpenses(response.data?.totalExpenses || 0);
      } else {
        toast.error(`Failed: ${response.message || "Expenses on date"}`);
      }
    } catch (error) {
      toast.error("Failed to fetch expenses on date");
      console.error("Error:", error);
    }
  };

  const wrappedFetchExpensesOnDateRange = async (startDate: string, endDate: string) => {
    try {
      const response = await store.fetchExpensesCountOnDateRange(startDate, endDate);
      if (response.success) {
        setExpensesCount(response.data?.count || 0);
      } else {
        toast.error(`Failed: ${response.message || "Expenses in date range"}`);
      }
    } catch (error) {
      toast.error("Failed to fetch expenses in date range");
      console.error("Error:", error);
    }
  };

  const wrappedFetchBalanceOnDate = async (date: string) => {
    try {
      const response = await store.fetchBalanceOnDate(date);
      if (response.success) {
        setBalance(response.data?.netBalance || 0);
        setTotalExpenses(response.data?.totalExpenses || 0);
        setExpensesCount(response.data?.totalExpensesCount|| 0);
        setTotalSales(response.data?.totalSales || 0);
        setRecordCount(response.data?.totalSalesCount || 0)
      } else {
        toast.error(`Failed: ${response.message || "Balance on date"}`);
      }
    } catch (error) {
      toast.error("Failed to fetch balance on date");
      console.error("Error:", error);
    }
  };

  const wrappedFetchBalanceOnDateRange = async (startDate: string, endDate: string) => {
    try {
      const response = await store.fetchBalanceOnDateRange(startDate,endDate);
      if (response.success) {
        setBalance(response.data?.totalBalance || 0);
      } else {
        toast.error(`Failed: ${response.message || "Balance in date range"}`);
      }
    } catch (error) {
      toast.error("Failed to fetch balance in date range");
      console.error("Error:", error);
    }
  };

  // ---- CONTEXT VALUE ----
  const contextValue = useMemo(
    () => ({
      balance,
      recordCount,
      totalRoomCount,
      activeRoomCount,
      totalCustomerCount,
      activeCustomerCount,
      newCustomerCount,
      expensesCount,
      totalExpenses,
      totalSales,
      loading: store.loading,
      error: store.error,
      fetchRecordCountOnDate: wrappedFetchRecordCountForDate,
      fetchRecordCountForDateRange: wrappedFetchRecordCountForDateRange,
      fetchActiveRoomsCount: wrappedFetchActiveRooms,
      fetchTotalRoomsCount: wrappedFetchTotalRooms,
      fetchActiveCustomersCount: wrappedFetchActiveCustomers,
      fetchTotalCustomersCount: wrappedFetchTotalCustomers,
      fetchNewCustomersOnDateCount: wrappedFetchNewCustomersOnDateCount,
      fetchNewCustomersOnDateRangeCount: wrappedFetchNewCustomersOnDateRangeCount,
      fetchExpensesOnDate: wrappedFetchExpensesOnDate,
      fetchExpensesCountOnDateRange: wrappedFetchExpensesOnDateRange,
      fetchBalanceOnDate: wrappedFetchBalanceOnDate,
      fetchBalanceOnDateRange: wrappedFetchBalanceOnDateRange,
    }),
    [
      balance,
      recordCount,
      totalRoomCount,
      activeRoomCount,
      totalCustomerCount,
      activeCustomerCount,
      newCustomerCount,
      expensesCount,
      store.loading,
      store.error,
    ]
  );

  return (
    <ComputationContext.Provider value={contextValue}>
      {children}
    </ComputationContext.Provider>
  );
};

export const useComputation = () => {
  const context = useContext(ComputationContext);
  if (!context) throw new Error("useComputation must be used within a ComputationProvider");
  return context;
};
