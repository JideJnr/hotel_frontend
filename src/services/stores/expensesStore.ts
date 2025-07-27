import { create } from 'zustand';
import * as api from '../services/api';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  receiptUrl?: string;
}

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchExpenses: () => Promise<void>;
  createExpense: (data: Partial<Expense>) => Promise<void>;
  updateExpense: (id: string, data: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],
  loading: false,
  error: null,

  fetchExpenses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getAllExpenses();
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch expenses');
      }
      
      set({ 
        expenses: (response).expenses || [],
        loading: false 
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createExpense: async (data: Partial<Expense>) => {
    set({ loading: true, error: null });
    try {
      const response = await api.createExpense(data);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to create expense');
      }
      
      const newExpense = (response as api.SingleExpenseResponse).expense;
      
      set((state) => ({
        expenses: [...state.expenses, newExpense],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateExpense: async (id: string, data: Partial<Expense>) => {
    set({ loading: true, error: null });
    try {
      const response = await api.updateExpense(id, data);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to update expense');
      }
      
      const updatedExpense = (response as api.SingleExpenseResponse).expense;
      
      set((state) => ({
        expenses: state.expenses.map((exp) =>
          exp.id === id ? updatedExpense : exp
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteExpense: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.deleteExpense(id);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete expense');
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