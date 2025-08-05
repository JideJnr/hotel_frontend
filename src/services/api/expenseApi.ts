import api from './index';

export const getAllExpenses = async () => {
  const res = await api.get('/api/expenses');
  return res.data;
};

export const createExpense = async (data: Partial<Expense>) => {
  const res = await api.post('/api/expenses', data);
  return res.data;
};

export const updateExpense = async (id: string, data: Partial<Expense>) => {
  const res = await api.put(`/api/expenses/${id}`, data);
  return res.data;
};

export const deleteExpense = async (id: string) => {
  const res = await api.delete(`/api/expenses/${id}`);
  return res.data;
};
