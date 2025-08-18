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

interface PaginationParams {
  pageSize?: number;
  lastCreatedAt?: string;
  lastId?: string;
}

interface DateRangeParams {
  startDate?: string;
  endDate?: string;
}

/** 🔹 Get expenses within a date range */
export const getExpensesByDateRange = async (params?: DateRangeParams & PaginationParams) => {
  const res = await api.get('/expenses/range', { params });
  return res.data ;
};

/** 🔹 Get expenses by category */
export const getExpensesByCategory = async (category: string, params?: PaginationParams) => {
  const res = await api.get(`/expenses/category/${category}`, { params });
  return res.data ;
};

/** 🔹 Get expenses for a specific date (single-day) */
export const getExpensesOnDate = async (date: string) => {
  const res = await api.get(`/expenses/${date}`);
  return res.data ;
};

/** 🔹 Get expense summary */
export const getExpenseSummary = async (params: DateRangeParams) => {
  const res = await api.get('/expenses/summary', { params });
  return res.data;
};

/** 🔹 Get expense by ID */
export const getExpenseById = async (id: string) => {
  const res = await api.get(`/expenses/${id}`);
  return res.data ;
};

/** 🔹 Create new expense */
export const createExpense = async (data: Partial<Expense>) => {
  const res = await api.post('/expenses', data);
  return res.data ;
};

/** 🔹 Update expense */
export const updateExpense = async (id: string, data: Partial<Expense>) => {
  const res = await api.put(`/expenses/${id}`, data);
  return res.data ;
};

/** 🔹 Delete expense */
export const deleteExpense = async (id: string) => {
  const res = await api.delete(`/expenses/${id}`);
  return res.data;
};
