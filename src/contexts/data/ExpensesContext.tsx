import { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useIonRouter } from '@ionic/react';
import { useExpenseStore } from '../../services/stores/expensesStore';

interface Expense {
  id: string;
  category: string;
  amount: number;
  description?: string;
  paymentMethod?: string;
  reference?: string;
  date?: string;
  receiptURL?: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  expense: Expense | null;
  loading: boolean;
  error: string | null;

  createExpense: (payload: Partial<Expense>) => Promise<Expense>;
  updateExpense: (id: string, payload: Partial<Expense>) => Promise<Expense>;
  deleteExpense: (id: string) => Promise<any>;
  fetchExpenses: (params?: { startDate?: string; endDate?: string; pageSize?: number }) => Promise<Expense[]>;
  fetchTodayExpenses: () => Promise<Expense[]>;
  fetchExpense: (id: string) => Promise<Expense>;
  fetchExpensesByCategory: (category: string, params?: { pageSize?: number }) => Promise<Expense[]>;
  fetchExpenseSummary: (params: { startDate: string; endDate: string }) => Promise<any>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useIonRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expense, setExpense] = useState<Expense | null>(null);
  const store = useExpenseStore();

  // 🔹 Create Expense
  const wrappedCreateExpense = async (payload: Partial<Expense>) => {
    try {
      const created = await store.createExpense(payload);
      toast.success('Expense created successfully');
      sessionStorage.removeItem('expenseData');
      router.push('/', 'forward');
      return created;
    } catch (error) {
      toast.error('Expense creation failed');
      
    }
  };

  // 🔹 Update Expense
  const wrappedUpdateExpense = async (id: string, payload: Partial<Expense>) => {
    try {
      const updated = await store.updateExpense(id, payload);
      toast.success('Expense updated successfully');
      sessionStorage.removeItem('expenseData');
      router.push('/expenses', 'forward');
     
    } catch (error) {
      toast.error('Expense update failed');
    
    }
  };

  // 🔹 Delete Expense
  const wrappedDeleteExpense = async (id: string) => {
    try {
      await store.deleteExpense(id);
      
      toast.success('Expense deleted successfully');
      sessionStorage.removeItem('expenseData');
      router.push('/expenses', 'forward');
    
    } catch (error) {
      toast.error('Expense deletion failed');
     
    }
  };

  // 🔹 Fetch Expenses by Range
  const wrappedFetchExpenses = async (params?: { startDate?: string; endDate?: string; pageSize?: number }) => {
    try {
      const response = await store.fetchExpensesOnDateRange(params);
      setExpenses(response.data);
      
    } catch (error) {
      toast.error('Failed to fetch expenses');
      
    }
  };

  // 🔹 Fetch Today's Expenses
  const wrappedFetchTodayExpenses = async () => {
    try {
      const today = new Date();
      const date = today.toISOString().split('T')[0];
    
      const response = await store.fetchExpensesOnDate( date );
      setExpenses(response.data);
      
    } catch (error) {
      toast.error('Failed to fetch today\'s expenses');
      
    }
  };

    // 🔹 Fetch Today's Expenses
  const wrappedFetchExpensesOnDate = async (date:string) => {
    try {
      const response = await store.fetchExpensesOnDate( date );
      setExpenses(response.data);
      
    } catch (error) {
      toast.error('Failed to fetch today\'s expenses');
      
    }
  };


  // 🔹 Fetch Single Expense
  const wrappedFetchExpense = async (id: string) => {
    try {
      const response = await store.fetchExpense(id);
      setExpense(response.data);
     
    } catch (error) {
      toast.error(`Failed to fetch expense ${id}`);
      
    }
  };

  // 🔹 Fetch Expenses by Category
  const wrappedFetchExpensesByCategory = async (category: string, params?: { pageSize?: number }) => {
    try {
      const response = await store.fetchExpensesByCategory(category, params);
      setExpenses(response.data);
    } catch (error) {
      toast.error(`Failed to fetch expenses for category ${category}`);
    }
  };

  // 🔹 Fetch Summary
  const wrappedFetchExpenseSummary = async (params: { startDate: string; endDate: string }) => {
    try {
      const response =  await store.fetchExpenseSummary(params);

    } catch (error) {
      toast.error('Failed to fetch expense summary');
      
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
  if (!context) throw new Error('useExpenses must be used within an ExpenseProvider');
  return context;
};
