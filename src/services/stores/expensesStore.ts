import { create } from 'zustand';
import * as api from '../api';
import { createExpense, deleteExpense, getAllExpenses, updateExpense } from '../api/expenseApi';



export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],
  loading: false,
  error: null,

  fetchExpenses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllExpenses();
      
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

  createExpense: async (data: Partial<ExpensesData>) => {
    set({ loading: true, error: null });
    try {
      const response = await createExpense(data);
      
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

  updateExpense: async (id: string, data: Partial<ExpensesData>) => {
    set({ loading: true, error: null });
    try {
      const response = await updateExpense(id, data);
      
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
      const response = await deleteExpense(id);
      
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