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
  createExpense: (payload: Partial<Expense>) => Promise<Response>;
  updateExpense: (id: string, payload: Partial<Expense>) => Promise<Response>;
  deleteExpense: (id: string) => Promise<Response>;
  fetchExpenses: (params?: {
    startDate?: string;
    endDate?: string;
    pageSize?: number;
  }) => Promise<Response>;
  fetchExpense: (id: string) => Promise<Response>;
  fetchExpensesByCategory: (category: string, params?: {
    pageSize?: number;
  }) => Promise<Response>;
  fetchExpenseSummary: (params: {
    startDate: string;
    endDate: string;
  }) => Promise<Response>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useIonRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expense, setExpense] = useState<Expense | null>(null);
  const store = useExpenseStore();
  
  const wrappedCreateExpense = async (payload: Partial<Expense>) => {
    try {
      
      const response = await store.createExpense(payload);
      if (response.success) {
        toast.success('Expense created successfully');
        sessionStorage.removeItem("expenseData");
        router.push('/', 'forward');
      } else {
        toast.error(`Creation failed: ${response.message}`);
      }
      return response;
    } catch (error) {
      toast.error('Expense creation error');
      console.error('Creation error:', error);
      throw error;
    }
  };

  const wrappedUpdateExpense = async (id: string, payload: Partial<Expense>) => {
    try {
      
      const response = await store.updateExpense(id, payload);
      if (response.success) {
        setExpenses(prev => prev.map(exp => exp.id === id ? response.data : exp));
        setExpense(prev => prev?.id === id ? response.data : prev);
        toast.success('Expense updated successfully');
        sessionStorage.removeItem("expenseData");
        router.push('/expenses', 'forward');
      } else {
        toast.error(`Update failed: ${response.message}`);
      }
      return response;
    } catch (error) {
      toast.error('Expense update error');
      console.error('Update error:', error);
      throw error;
    }
  };

  const wrappedDeleteExpense = async (id: string) => {
    try {
      
      const response = await store.deleteExpense(id);
      if (response.success) {
        setExpenses(prev => prev.filter(exp => exp.id !== id));
        setExpense(prev => prev?.id === id ? null : prev);
        toast.success('Expense deleted successfully');
        sessionStorage.removeItem("expenseData");
        router.push('/expenses', 'forward');
      } else {
        toast.error(`Deletion failed: ${response.message}`);
      }
      return response;
    } catch (error) {
      toast.error('Expense deletion error');
      console.error('Deletion error:', error);
      throw error;
    }
  };

  const wrappedFetchExpenses = async (params?: any) => {
    try {
      
      const response = await store.fetchExpensesByDateRange(params);
      if (response.success) {
        setExpenses(response.data);
      }
      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const wrappedFetchExpense = async (id: string) => {
    try {
      
      const response = await store.fetchExpense(id);
      if (response.success) {
        setExpense(response.data);
      }
      return response;
    } catch (error) {
      toast.error(`Failed to fetch expense ${id}`);
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const wrappedFetchExpensesByCategory = async (category: string, params?: {
    pageSize?: number;
  }) => {
    try {
      
      const response = await store.fetchExpensesByCategory(category, params);
      if (response.success) {
        setExpenses(response.data);
      }
      return response;
    } catch (error) {
      toast.error(`Failed to fetch expenses for category ${category}`);
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const wrappedFetchExpenseSummary = async (params: {
    startDate: string;
    endDate: string;
  }) => {
    try {
      
      const response = await store.fetchExpenseSummary(params);
      return response;
    } catch (error) {
      toast.error('Failed to fetch expense summary');
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const contextValue = useMemo(() => ({
    expenses,
    expense,
    loading: store.loading,
    error: store.error,
    createExpense: wrappedCreateExpense,
    updateExpense: wrappedUpdateExpense,
    deleteExpense: wrappedDeleteExpense,
    fetchExpenses: wrappedFetchExpenses,
    fetchExpense: wrappedFetchExpense,
    fetchExpensesByCategory: wrappedFetchExpensesByCategory,
    fetchExpenseSummary: wrappedFetchExpenseSummary,
  }), [expenses, expense, store.loading, store.error]);

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error('useExpenses must be used within an ExpenseProvider');
  return context;
};