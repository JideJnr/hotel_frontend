import { create } from 'zustand';
import { 
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpensesByCategory,
  getExpenseSummary,
  getTodayExpenses,
  getExpensesByDateRange // Make sure this exists in your API
} from '../api/expenseApi';

import { ApiResponse } from '../api/expenseApi';

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;

  fetchExpense: (id: string) => Promise<ApiResponse<Expense>>;
  fetchExpensesByDateRange: (params?: {
    startDate?: string;
    endDate?: string;
    pageSize?: number;
    lastCreatedAt?: string;
    lastId?: string;
  }) => Promise<ApiResponse<{ expenses: Expense[] }>>;
  fetchTodayExpenses: (params?: {
    pageSize?: number;
    lastCreatedAt?: string;
    lastId?: string;
  }) => Promise<ApiResponse<{ expenses: Expense[] }>>;
  fetchExpensesByCategory: (category: string, params?: {
    pageSize?: number;
    lastCreatedAt?: string;
    lastId?: string;
  }) => Promise<ApiResponse<{ expenses: Expense[] }>>;
  fetchExpenseSummary: (params: {
    startDate: string;
    endDate: string;
  }) => Promise<ExpenseSummary | undefined>;
  createExpense: (data: Partial<Expense>) => Promise<ApiResponse<{ expenseId: string }>>;
  updateExpense: (id: string, data: Partial<Expense>) => Promise<ApiResponse<null>>;
  deleteExpense: (id: string) => Promise<ApiResponse<null>>;
}


export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],
  loading: false,
  error: null,

  fetchExpense: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await getExpenseById(id);
      if (!response.success) throw new Error(response.message || 'Failed to fetch expense');
      set({ expenses: response.data ? [response.data] : [], loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchExpensesByDateRange: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await getExpensesByDateRange(params);
      if (!response.success) throw new Error(response.message || 'Failed to fetch expenses');
      set({ expenses: response.data?.expenses || [], loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchTodayExpenses: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await getTodayExpenses(params);
      if (!response.success) throw new Error(response.message || 'Failed to fetch today\'s expenses');
      set({ expenses: response.data?.expenses || [], loading: false });
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
      if (!response.success) throw new Error(response.message || 'Failed to fetch expenses by category');
      set({ expenses: response.data?.expenses || [], loading: false });
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
      if (!response.success) throw new Error(response.message || 'Failed to fetch expense summary');
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
      const response = await createExpense(data);
      if (!response.success) throw new Error(response.message || 'Failed to create expense');
      set((state) => ({
        expenses: [...state.expenses, { ...data, id: response.data?.expenseId } as Expense],
        loading: false,
      }));
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
      if (!response.success) throw new Error(response.message || 'Failed to update expense');
      set((state) => ({
        expenses: state.expenses.map((exp) => (exp.id === id ? { ...exp, ...data } : exp)),
        loading: false,
      }));
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
      if (!response.success) throw new Error(response.message || 'Failed to delete expense');
      set((state) => ({
        expenses: state.expenses.filter((exp) => exp.id !== id),
        loading: false,
      }));
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));
