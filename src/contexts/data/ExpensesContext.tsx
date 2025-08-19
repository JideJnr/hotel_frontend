import { createContext, useContext, ReactNode, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useIonRouter } from "@ionic/react";
import { useExpenseStore } from "../../services/stores/expensesStore";

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useIonRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expense, setExpense] = useState<Expense | null>(null);
  const store = useExpenseStore();

  // 🔹 Create Expense
  const wrappedCreateExpense = async (payload: Partial<Expense>) => {
    try {
      const res = await store.createExpense(payload);
      if (res?.success) {
        toast.success("Expense created successfully");
        sessionStorage.removeItem("expenseData");
        router.push("/", "forward");
      } else {
        toast.error(res?.message || "Expense creation failed");
      }
    } catch (error) {
      toast.error("Expense creation failed");
    }
  };

  // 🔹 Update Expense
  const wrappedUpdateExpense = async (id: string, payload: Partial<Expense>) => {
    try {
      const res = await store.updateExpense(id, payload);
      if (res?.success) {
        toast.success("Expense updated successfully");
        sessionStorage.removeItem("expenseData");
        router.push("/expenses", "forward");
      } else {
        toast.error(res?.message || "Expense update failed");
      }
    } catch (error) {
      toast.error("Expense update failed");
    }
  };

  // 🔹 Delete Expense
  const wrappedDeleteExpense = async (id: string) => {
    try {
      const res = await store.deleteExpense(id);
      if (res?.success) {
        toast.success("Expense deleted successfully");
        sessionStorage.removeItem("expenseData");
        router.push("/expenses", "forward");
      } else {
        toast.error(res?.message || "Expense deletion failed");
      }
    } catch (error) {
      toast.error("Expense deletion failed");
    }
  };

  // 🔹 Fetch Expenses by Range
  const wrappedFetchExpenses = async (params?: { startDate?: string; endDate?: string; pageSize?: number }) => {
    try {
      const res = await store.fetchExpensesOnDateRange(params);
      if (res?.success) {
        setExpenses(res.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch expenses");
      }
    } catch (error) {
      toast.error("Failed to fetch expenses");
    }
  };

  // 🔹 Fetch Today's Expenses
  const wrappedFetchTodayExpenses = async () => {
    try {
      const today = new Date();
      const date = today.toISOString().split("T")[0];
      const res = await store.fetchExpensesOnDate(date);
      if (res?.success) {
        setExpenses(res.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch today's expenses");
      }
    } catch (error) {
      toast.error("Failed to fetch today's expenses");
    }
  };

  // 🔹 Fetch Expenses on Specific Date
  const wrappedFetchExpensesOnDate = async (date: string) => {
    try {
      const res = await store.fetchExpensesOnDate(date);
      if (res?.success) {
        setExpenses(res.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch expenses");
      }
    } catch (error) {
      toast.error("Failed to fetch expenses");
    }
  };

  // 🔹 Fetch Single Expense
  const wrappedFetchExpense = async (id: string) => {
    try {
      const res = await store.fetchExpense(id);
      if (res?.success) {
        setExpense(res.data || null);
      } else {
        toast.error(res?.message || `Failed to fetch expense ${id}`);
      }
    } catch (error) {
      toast.error(`Failed to fetch expense ${id}`);
    }
  };

  // 🔹 Fetch Expenses by Category
  const wrappedFetchExpensesByCategory = async (category: string, params?: { pageSize?: number }) => {
    try {
      const res = await store.fetchExpensesByCategory(category, params);
      if (res?.success) {
        setExpenses(res.data || []);
      } else {
        toast.error(res?.message || `Failed to fetch expenses for category ${category}`);
      }
    } catch (error) {
      toast.error(`Failed to fetch expenses for category ${category}`);
    }
  };

  // 🔹 Fetch Summary
  const wrappedFetchExpenseSummary = async (params: { startDate: string; endDate: string }) => {
    try {
      const res = await store.fetchExpenseSummary(params);
      if (!res?.success) {
        toast.error(res?.message || "Failed to fetch expense summary");
      }
      // ⚠️ Not setting state because summary may need its own state field
    } catch (error) {
      toast.error("Failed to fetch expense summary");
    }
  };

  const contextValue = useMemo(
    () => ({
      expenses,
      expense,
      loading: store.loading,
      error: store.error,
      createExpense: wrappedCreateExpense,
      updateExpense: wrappedUpdateExpense,
      deleteExpense: wrappedDeleteExpense,
      fetchExpenses: wrappedFetchExpenses,
      fetchTodayExpenses: wrappedFetchTodayExpenses,
      fetchExpensesOnDate: wrappedFetchExpensesOnDate,
      fetchExpense: wrappedFetchExpense,
      fetchExpensesByCategory: wrappedFetchExpensesByCategory,
      fetchExpenseSummary: wrappedFetchExpenseSummary,
    }),
    [expenses, expense, store.loading, store.error]
  );

  return <ExpenseContext.Provider value={contextValue}>{children}</ExpenseContext.Provider>;
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error("useExpenses must be used within an ExpenseProvider");
  return context;
};
