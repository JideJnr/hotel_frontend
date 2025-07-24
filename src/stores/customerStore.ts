import { create } from 'zustand';
import * as api from '../services/api';

interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  createdAt?: any;
  updatedAt?: any;
}

interface CustomerState {
  customers: Customer[];
  customer: Customer | null;
  loading: boolean;
  error: string | null;

  fetchCustomers: () => Promise<void>;
  getCustomer: (id: string) => Promise<void>;
  createCustomer: (data: Partial<Customer>) => Promise<void>;
  updateCustomer: (id: string, data: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  customer: null,
  loading: false,
  error: null,

  fetchCustomers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getAllCustomers();
      if (!response.success) throw new Error(response.error || 'Failed to fetch customers');
      set({ customers: response.customers, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getCustomer: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.getCustomerById(id);
      if (!response.success) throw new Error(response.error || 'Customer not found');
      set({ customer: response.customer, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createCustomer: async (data: Partial<Customer>) => {
    set({ loading: true, error: null });
    try {
      const response = await api.createCustomer(data);
      if (!response.success) throw new Error(response.error || 'Failed to create customer');
      set((state) => ({
        customers: [...state.customers, response.customer],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateCustomer: async (id: string, data: Partial<Customer>) => {
    set({ loading: true, error: null });
    try {
      const response = await api.updateCustomer(id, data);
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
      const response = await api.deleteCustomer(id);
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
