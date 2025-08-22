import { create } from 'zustand';
import {
  createRecord as apiCreateRecord,
  updateRecord as apiUpdateRecord,
  deleteRecord as apiDeleteRecord,
  
  getRecordsOnDate,
  getRecordById,
  getUserRecords,
  getRecordsOnDateRange,
  checkOut,
} from '../api/recordApi';
import type {
  Record,
  RecordInput,
  DateRangeParams,
  PaginationParams,
  
} from '../api/recordApi';

interface RecordStoreState {
  loading: boolean;
  error: string | null;
  fetchRecordsOnDateRange: (params: DateRangeParams) => Promise<Response>;
  fetchRecordsOnDate: (date: any, page:number,limit:number) => Promise<Response>;
  fetchRecordById: (id: string) => Promise<Response>;
  fetchUserRecords: (params?: PaginationParams) => Promise<Response>;
  createRecord: (payload: RecordInput) => Promise<Response>;
  updateRecord: (id: string, payload: RecordInput) => Promise<Response>;
  deleteRecord: (id: string) => Promise<Response>;
  checkoutRecord: (id: string) => Promise<Response>;
}

export const useRecordStore = create<RecordStoreState>((set) => ({
  loading: false,
  error: null,


  fetchRecordsOnDateRange: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await getRecordsOnDateRange(params);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

// In your store file
fetchRecordsOnDate: async (date: string, page: number = 1, limit: number = 10) => {
  set({ loading: true, error: null });
  try {
    const response = await getRecordsOnDate(date, page, limit); // You'll need to update your API function
    set({ loading: false });
    return response;
  } catch (err: any) {
    set({ error: err.message, loading: false });
    throw err;
  }
},

  fetchRecordById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await getRecordById(id);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchUserRecords: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await getUserRecords(params);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  createRecord: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await apiCreateRecord(payload);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  updateRecord: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const response = await apiUpdateRecord(id, payload);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  deleteRecord: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await apiDeleteRecord(id);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

    checkoutRecord: async (id:string) => {
    set({ loading: true, error: null });
    try {
      const response = await checkOut(id);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));