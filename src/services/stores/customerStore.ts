import { create } from 'zustand';
import * as api from '../api';
import { createCustomer, deleteCustomer, getAllCustomers, getCustomerById, updateCustomer } from '../api/customerApi';


export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  customer: null,
  loading: false,
  error: null,

  fetchCustomer: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllCustomers();
      if (!response.success) throw new Error(response.error || 'Failed to fetch customers');
      set({ customers: response.customers, loading: false });
      return response;

    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getCustomerById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getCustomerById(id);
      if (!response.success) throw new Error(response.error || 'Customer not found');
      set({ customer: response.customer, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createCustomer: async (data: Partial<CustomerData>) => {
    set({ loading: true, error: null });
    try {
      const response = await createCustomer(data);  
      if (!response.success) throw new Error(response.error || 'Failed to create customer');
      set((state) => ({
        customers: [...state.customers, response.customer],
        loading: false,
      }));
      console.log('Customer created:', response);
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateCustomer: async (id: string, data: Partial<CustomerData>) => {
    set({ loading: true, error: null });
    try {
      const response = await updateCustomer(id, data);
      if (!response.success) throw new Error(response.error || 'Failed to update customer');
      set((state) => ({
        customers: state.customers.map((cust) =>
          cust.id === id ? response.customer : cust
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteCustomer: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteCustomer(id);
      if (!response.success) throw new Error(response.error || 'Failed to delete customer');
      set((state) => ({
        customers: state.customers.filter((cust) => cust.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  
}));
