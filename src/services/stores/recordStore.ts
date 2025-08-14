import { create } from 'zustand';
import {
  createRecord as apiCreateRecord,
  updateRecord as apiUpdateRecord,
  deleteRecord as apiDeleteRecord,
  getTodayRecords,
  getRecordsByDateRange,
  getRecordById,
  getUserRecords,
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
  fetchTodayRecords: (params?: PaginationParams) => Promise<Response>;
  fetchRecordsByDateRange: (params: DateRangeParams) => Promise<Response>;
  fetchRecordById: (id: string) => Promise<Response>;
  fetchUserRecords: (params?: PaginationParams) => Promise<Response>;
  createRecord: (payload: RecordInput) => Promise<Response>;
  updateRecord: (id: string, payload: RecordInput) => Promise<Response>;
  deleteRecord: (id: string) => Promise<Response>;
}

export const useRecordStore = create<RecordStoreState>((set) => ({
  loading: false,
  error: null,

  fetchTodayRecords: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await getTodayRecords(params);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchRecordsByDateRange: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await getRecordsByDateRange(params);
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
}));