import { create } from 'zustand';
import {
  getRecordCountForDate,
  getRecordCountForDateRange,
  getActiveRoomCount,
  getAllRoomCount,
  getAllCustomerCount,
  getCustomerRegisteredOnDate,
  getCustomerRegisteredOnDateRange,
  getActiveCustomerCount,
  getExpensesCountOnDate,
  getExpensesCountOnDateRange,
  getBookingCountOnDate,
  getBookingCountOnDateRange,
  getBalanceForDate,
  getBalanceForDateRange,
} from '../api/computeApi';

// types/computation.d.ts or inside same file
export interface ComputationState {
  loading: boolean;
  error: string | null;

  // ===== Records =====
  fetchRecordCountForDate: (date: string) => Promise<Response>;
  fetchRecordCountForDateRange: (startDate: string, endDate: string) => Promise<Response>;

  // ===== Rooms =====
  fetchActiveRoomCount: () => Promise<Response>;
  fetchAllRoomCount: () => Promise<Response>;

  // ===== Customers =====
  fetchAllCustomerCount: () => Promise<Response>;
  fetchCustomerRegisteredOnDate: (date: string) => Promise<Response>;
  fetchCustomerRegisteredOnDateRange: (startDate: string, endDate: string) => Promise<Response>;
  fetchActiveCustomerCount: () => Promise<Response>;

  // ===== Expenses =====
  fetchExpensesCountOnDate: (date: string) => Promise<Response>;
  fetchExpensesCountOnDateRange: (startDate: string, endDate: string) => Promise<Response>;

  // ===== Bookings =====
  fetchBookingCountOnDate: (date: string) => Promise<Response>;
  fetchBookingCountOnDateRange: (startDate: string, endDate: string) => Promise<Response>;

  // ===== Balance =====
  fetchBalanceOnDate: (date: string) => Promise<Response>;
  fetchBalanceOnDateRange: (startDate: string, endDate: string) => Promise<Response>;
}


export const useComputationStore = create<ComputationState>((set) => ({
  loading: false,
  error: null,

  // ===== Records =====
  fetchRecordCountForDate: async (date: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getRecordCountForDate(date);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchRecordCountForDateRange: async (startDate: string, endDate: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getRecordCountForDateRange(startDate, endDate);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // ===== Rooms =====
  fetchActiveRoomCount: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getActiveRoomCount();
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchAllRoomCount: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllRoomCount();
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // ===== Customers =====
  fetchAllCustomerCount: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllCustomerCount();
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchCustomerRegisteredOnDate: async (date: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getCustomerRegisteredOnDate(date);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchCustomerRegisteredOnDateRange: async (startDate: string, endDate: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getCustomerRegisteredOnDateRange(startDate, endDate);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchActiveCustomerCount: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getActiveCustomerCount();
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // ===== Expenses =====
  fetchExpensesCountOnDate: async (date: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getExpensesCountOnDate(date);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchExpensesCountOnDateRange: async (startDate: string, endDate: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getExpensesCountOnDateRange(startDate, endDate);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // ===== Bookings =====
  fetchBookingCountOnDate: async (date: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getBookingCountOnDate(date);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchBookingCountOnDateRange: async (startDate: string, endDate: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getBookingCountOnDateRange(startDate, endDate);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchBalanceOnDate: async (startDate: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getBalanceForDate(startDate);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchBalanceOnDateRange: async (startDate: string, endDate: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getBalanceForDateRange(startDate, endDate);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },


}));
