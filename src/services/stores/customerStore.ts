import { create } from 'zustand';
import { createCustomer, customerRegisteredOnDate, customerRegisteredOnDateRange, deleteCustomer, getAllCustomers, getCustomerById, searchCustomers, totalCustomer, updateCustomer } from '../api/customerApi';


export const useCustomerStore = create<CustomerState>((set) => ({

  loading: false,
  error: null,

  fetchCustomer: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllCustomers();
      set({ loading: false });
      return response;

    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getCustomerById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getCustomerById(id);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createCustomer: async (data: Partial<CustomerData>) => {
    set({ loading: true, error: null });
    try {
      const response = await createCustomer(data);  
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      // Return a default error response to satisfy the type
      return { success: false, token: '', data: null };
    }
  },

  updateCustomer: async (id: string, data: Partial<CustomerData>) => {
    set({ loading: true, error: null });
    try {
      const response = await updateCustomer(id, data);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteCustomer: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteCustomer(id);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getTotalCustomerCount: async () => {
    set({ loading: true, error: null });
    try {
      const response = await totalCustomer();
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getCustomerRegisteredOnDate: async (date:string) => {
    set({ loading: true, error: null });
    try {
      const response = await customerRegisteredOnDate(date);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getCustomerRegisteredOnDateRange: async (params:any) => {
    set({ loading: true, error: null });
    try {
      const response = await customerRegisteredOnDateRange(params);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  searchCustomer: async (query: string) => {
    set({ loading: true, error: null });
    try {
      const response = await searchCustomers(query);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message || "Something went wrong", loading: false });
    }
  },

  
  
}));
