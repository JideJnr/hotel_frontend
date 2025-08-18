import { create } from 'zustand';
import { 
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpensesByCategory,
  getExpenseSummary,
  getExpensesOnDate,
  getExpensesByDateRange
} from '../api/expenseApi';

interface PaginationParams {
  pageSize?: number;
  lastCreatedAt?: string;
  lastId?: string;
}

interface DateRangeParams extends PaginationParams {
  startDate: string;
  endDate: string;
}

interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  createdAt: string; // ISO format
  updatedAt?: string; // ISO format
}

interface ExpenseState {
  loading: boolean;
  error: string | null;

  fetchExpense: (id: string) => Promise<Response>;
  fetchExpensesOnDateRange: (params?: any) => Promise<Response>;
  fetchExpensesOnDate: ( date: string) => Promise<Response>;
  fetchExpensesByCategory: (category: string, params?: PaginationParams) => Promise<Response>;
  fetchExpenseSummary: (params: { startDate: string; endDate: string }) => Promise<Response>;
  createExpense: (data: Partial<Expense>) => Promise<Response>;
  updateExpense: (id: string, data: Partial<Expense>) => Promise<Response>;
  deleteExpense: (id: string) => Promise<Response>;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  loading: false,
  error: null,

  fetchExpense: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await getExpenseById(id);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchExpensesOnDateRange: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await getExpensesByDateRange(params);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchExpensesOnDate: async (date:string) => {
    set({ loading: true, error: null });
    try {
      const response = await getExpensesOnDate(date);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchExpensesByCategory: async (category, params) => {
    set({ loading: true, error: null });
    try {
      const response = await getExpensesByCategory(category, params);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchExpenseSummary: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await getExpenseSummary(params);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  createExpense: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await createExpense(data);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  updateExpense: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await updateExpense(id, data);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  deleteExpense: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteExpense(id);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));
