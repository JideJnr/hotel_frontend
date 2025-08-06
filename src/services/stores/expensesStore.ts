import { create } from 'zustand';
import { 
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpensesByCategory,
  getExpenseSummary,
  ApiResponse,
  Expense,
  PaginatedExpenseResponse,
  ExpenseSummary
} from '../api/expenseApi';

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  fetchExpenses: (params?: {
    startDate?: string;
    endDate?: string;
    pageSize?: number;
    lastCreatedAt?: string;
    lastId?: string;
  }) => Promise<void>;
  fetchExpensesByCategory: (category: string, params?: {
    pageSize?: number;
    lastCreatedAt?: string;
    lastId?: string;
  }) => Promise<void>;
  fetchExpenseSummary: (params: {
    startDate: string;
    endDate: string;
  }) => Promise<ExpenseSummary | undefined>;
  createExpense: (data: Partial<Expense>) => Promise<void>;
  updateExpense: (id: string, data: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],
  loading: false,
  error: null,

  fetchExpenses: async (params) => {
    set({ loading: true, error: null });
    try {
      const response: ApiResponse<PaginatedExpenseResponse> = await getAllExpenses(params);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch expenses');
      }
      
      set({ 
        expenses: response.data?.expenses || [],
        loading: false 
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchExpensesByCategory: async (category, params) => {
    set({ loading: true, error: null });
    try {
      const response: ApiResponse<PaginatedExpenseResponse> = await getExpensesByCategory(category, params);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch expenses by category');
      }
      
      set({ 
        expenses: response.data?.expenses || [],
        loading: false 
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchExpenseSummary: async (params) => {
    set({ loading: true, error: null });
    try {
      const response: ApiResponse<ExpenseSummary> = await getExpenseSummary(params);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch expense summary');
      }
      
      set({ loading: false });
      return response.data;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      return undefined;
    }
  },

  createExpense: async (data) => {
    set({ loading: true, error: null });
    try {
      const response: ApiResponse<{ expenseId: string }> = await createExpense(data);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to create expense');
      }
      
      // Optionally fetch the new expense details if needed
      // Or you can optimistically update the store
      set((state) => ({
        expenses: [...state.expenses, { ...data, id: response.data?.expenseId } as Expense],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateExpense: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response: ApiResponse<void> = await updateExpense(id, data);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to update expense');
      }
      
      set((state) => ({
        expenses: state.expenses.map((exp) =>
          exp.id === id ? { ...exp, ...data } : exp
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteExpense: async (id) => {
    set({ loading: true, error: null });
    try {
      const response: ApiResponse<void> = await deleteExpense(id);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete expense');
      }
      
      set((state) => ({
        expenses: state.expenses.filter((exp) => exp.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));