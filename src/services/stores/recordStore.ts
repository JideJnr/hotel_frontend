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
  records: Record[];
  record: Record | null;
  loading: boolean;
  error: string | null;

  fetchTodayRecords: (params?: PaginationParams) => Promise<void>;
  fetchRecordsByDateRange: (params: DateRangeParams) => Promise<void>;
  fetchRecordById: (id: string) => Promise<void>;
  fetchUserRecords: (params?: PaginationParams) => Promise<void>;
  createRecord: (payload: RecordInput) => Promise<void>;
  updateRecord: (id: string, payload: RecordInput) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
}

export const useRecordStore = create<RecordStoreState>((set) => ({
  records: [],
  record: null,
  loading: false,
  error: null,

  fetchTodayRecords: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await getTodayRecords(params);
      if (!res.success) throw new Error(res.message);
      set({ records: res.data.records, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchRecordsByDateRange: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await getRecordsByDateRange(params);
      if (!res.success) throw new Error(res.message);
      set({ records: res.data.records, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchRecordById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await getRecordById(id);
      if (!res.success) throw new Error(res.message);
      set({ record: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchUserRecords: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await getUserRecords(params);
      if (!res.success) throw new Error(res.message);
      set({ records: res.data.records, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createRecord: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await apiCreateRecord(payload);
      if (!res.success) throw new Error(res.message);
      set((state) => ({
        records: [...state.records], // could refetch after creation
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateRecord: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const res = await apiUpdateRecord(id, payload);
      if (!res.success) throw new Error(res.message);
      set((state) => ({
        records: state.records.map((r) =>
          r.id === id ? { ...r, ...payload } : r
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteRecord: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await apiDeleteRecord(id);
      if (!res.success) throw new Error(res.message);
      set((state) => ({
        records: state.records.filter((r) => r.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
