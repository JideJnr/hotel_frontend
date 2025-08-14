import api from './index';

interface Expense {
  id: string;
  category: string;
  amount: number;
  description?: string;
  paymentMethod?: string;
  reference?: string;
  date?: string;
  receiptURL?: string;
  status?: 'active' | 'deleted';
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}




export const getExpensesByDateRange = async (params?: {
  startDate?: string;
  endDate?: string;
  pageSize?: number;
  lastCreatedAt?: string;
  lastId?: string;
}) => {
  const res = await api.get('/expenses/by-date-range', { params });
  return res.data;
};

 

export const getExpensesByCategory = async (category: string, params?: {
  pageSize?: number;
  lastCreatedAt?: string;
  lastId?: string;
}) => {
  const res = await api.get('/expenses/by-category', { 
    params: { category, ...params } 
  });
  return res.data;
};

export const getTodayExpenses = async (params: {
  startDate: string;
  endDate: string;
}) => {
  const res = await api.get('/expenses', { params });
  return res.data;
};

export const getExpenseSummary = async (params: {
  startDate: string;
  endDate: string;
}) => {
  const res = await api.get('/expenses/summary', { params });
  return res.data;
};

export const getExpenseById = async (id: string) => {
  const res = await api.get(`/expenses/${id}`);
  return res.data;
};

export const createExpense = async (data: Partial<Expense>) => {
  const res = await api.post('/expenses', data);
  return res.data;
};

export const updateExpense = async (id: string, data: Partial<Expense>) => {
  const res = await api.put(`/expenses/${id}`, data);
  return res.data;
};

export const deleteExpense = async (id: string) => {
  const res = await api.delete(`/expenses/${id}`);
  return res.data;
};