import api from './index';

export const getAllCustomers = async () => {
  const res = await api.get('/customers');
  return res.data;
};

export const getCustomerById = async (id: string) => {
  const res = await api.get(`/customers/${id}`);
  return res.data;
};

export const createCustomer = async (data: Partial<Customer>) => {
  const res = await api.post('/customers', data);
  return res.data;
};

export const updateCustomer = async (id: string, data: Partial<Customer>) => {
  const res = await api.put(`/customers/${id}`, data);
  return res.data;
};

export const deleteCustomer = async (id: string) => {
  const res = await api.delete(`/customers/${id}`);
  return res.data;
};