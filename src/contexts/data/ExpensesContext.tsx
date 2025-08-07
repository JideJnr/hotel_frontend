import { createContext, useContext, ReactNode, useMemo } from 'react';
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
  // Add other expense properties here
}

interface ExpenseContextType {
  expenses: Expense[];
  expense: Expense | null;
  loading: boolean;
  error: string | null;
  createExpense: (payload: Partial<Expense>) => Promise<void>;
  updateExpense: (id: string, payload: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  fetchExpenses: (params?: {
    startDate?: string;
    endDate?: string;
    pageSize?: number;
    lastCreatedAt?: string;
    lastId?: string;
  }) => Promise<void>;
  fetchExpense: (id: string) => Promise<void>;
  fetchExpensesByCategory: (category: string, params?: {
    pageSize?: number;
    lastCreatedAt?: string;
    lastId?: string;
  }) => Promise<void>;
  fetchExpenseSummary: (params: {
    startDate: string;
    endDate: string;
  }) => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useIonRouter();
  const {
    expenses,
    expense,
    loading,
    error,
    createExpense,
    updateExpense,
    deleteExpense,
    fetchExpenses,
    fetchExpense,
    fetchExpensesByCategory,
    fetchExpenseSummary,
  } = useExpenseStore();
  
  const wrappedCreateExpense = async (payload: Partial<Expense>) => {
    try {
      await createExpense(payload);
      toast.success('Expense created successfully');
      sessionStorage.removeItem("expenseData");
      router.push('/expenses', 'forward');
    } catch (error) {
      toast.error('Expense creation error');
      console.error('Creation error:', error);
    }
  };

  const wrappedUpdateExpense = async (id: string, payload: Partial<Expense>) => {
    try {
      await updateExpense(id, payload);
      toast.success('Expense updated successfully');
      router.push(`/expenses/${id}`, 'forward');
    } catch (error) {
      toast.error('Expense update error');
      console.error('Update error:', error);
    }
  };

  const wrappedDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id);
      toast.success('Expense deleted successfully');
      router.push('/expenses', 'back');
    } catch (error) {
      toast.error('Expense deletion error');
      console.error('Deletion error:', error);
    }
  };

  const wrappedFetchExpenses = async (params?: {
    startDate?: string;
    endDate?: string;
    pageSize?: number;
    lastCreatedAt?: string;
    lastId?: string;
  }) => {
    try {
      await fetchExpenses(params);
    } catch (error) {
      toast.error('Failed to fetch expenses');
      console.error('Fetch error:', error);
    }
  };

  const wrappedFetchExpense = async (id: string) => {
    try {
      await fetchExpense(id);
    } catch (error) {
      toast.error(`Failed to fetch expense ${id}`);
      console.error('Fetch error:', error);
    }
  };

  const wrappedFetchExpensesByCategory = async (category: string, params?: {
    pageSize?: number;
    lastCreatedAt?: string;
    lastId?: string;
  }) => {
    try {
      await fetchExpensesByCategory(category, params);
    } catch (error) {
      toast.error(`Failed to fetch expenses for category ${category}`);
      console.error('Fetch error:', error);
    }
  };

  const wrappedFetchExpenseSummary = async (params: {
    startDate: string;
    endDate: string;
  }) => {
    try {
      await fetchExpenseSummary(params);
    } catch (error) {
      toast.error('Failed to fetch expense summary');
      console.error('Fetch error:', error);
    }
  };

  const contextValue = useMemo(() => ({
    expenses,
    expense,
    loading,
    error,
    createExpense: wrappedCreateExpense,
    updateExpense: wrappedUpdateExpense,
    deleteExpense: wrappedDeleteExpense,
    fetchExpenses: wrappedFetchExpenses,
    fetchExpense: wrappedFetchExpense,
    fetchExpensesByCategory: wrappedFetchExpensesByCategory,
    fetchExpenseSummary: wrappedFetchExpenseSummary,
  }), [expenses, expense, loading, error]);

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error('useExpense must be used within an ExpenseProvider');
  return context;
};