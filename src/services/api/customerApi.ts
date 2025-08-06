import api from './index';

export const getAllCustomers = async () => {
  const res = await api.get('/api/v1/customers');
  return res.data;
};

export const getCustomerById = async (id: string) => {
  const res = await api.get(`/api/v1/customers/${id}`);
  return res.data;
};

export const createCustomer = async (data: Partial<Customer>) => {
  const res = await api.post('/api/v1/customers', data);
  return res.data;
};

export const updateCustomer = async (id: string, data: Partial<Customer>) => {
  const res = await api.put(`/api/v1/customers/${id}`, data);
  return res.data;
};

export const deleteCustomer = async (id: string) => {
  const res = await api.delete(`/api/v1/customers/${id}`);
  return res.data;
};