import api from './index';

export const getAllCustomers = async () => {
  const res = await api.get('/customers');
  return res.data;
};

export const getCustomerById = async (id: string) => {
  const res = await api.get(`/customers/${id}`);
  return res.data;
};

export const createCustomer = async (data: any) => {
  const res = await api.post('/customers', data);
  return res.data;
};

export const updateCustomer = async (id: string, data: any) => {
  const res = await api.put(`/customers/${id}`, data);
  return res.data;
};

export const deleteCustomer = async (id: string) => {
  const res = await api.delete(`/customers/${id}`);
  return res.data;
};

export const totalCustomer = async () => {
  const res = await api.delete(`/customers/count`);
  return res.data;
};

export const customerRegisteredOnDate = async (date:string) => {
  const res = await api.delete(`/customers/${date}`);
  return res.data;
};

export const customerRegisteredOnDateRange = async (params:any) => {
  const res = await api.delete(`/customers/${params}`);
  return res.data;
};

export const searchCustomers = async (query: string) => {
  const res = await api.get(`/customers/search`, {
    params: { query }
  });
  return res.data;
};
