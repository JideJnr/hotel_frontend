import { create } from 'zustand';
import * as api from '../services/api';

interface Record {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  receiptUrl?: string;
}

interface RecordState {
  record: null;
  records: Record[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchRecords: () => Promise<void>;
  createRecord: (id: string) => Promise<void>;
  updateRecord: (id: string, data: Partial<Record>) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
}

export const useRecordStore = create<RecordState>((set) => ({
  records: [],
  record:null,
  loading: false,
  error: null,

  fetchRecords: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getAllTodaysRecord();
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch records');
      }
      
      set({ 
        records: (response).records || [],
        loading: false 
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  
  fetchRecordById: async (id:string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.fetchRecordById(id);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch records');
      }
      
      set({ 
        records: (response).records || [],
        loading: false 
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createRecord: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.createRecord(id);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to create record');
      }
      

    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateRecord: async (id: string, data: Partial<Record>) => {
    set({ loading: true, error: null });
    try {
      const response = await api.updateRecord(id, data);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to update record');
      }
      
      const updatedRecord = (response as api.SingleRecordResponse).record;
      
      set((state) => ({
        records: state.records.map((exp) =>
          exp.id === id ? updatedRecord : exp
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteRecord: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.deleteRecord(id);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete record');
      }
      
      set((state) => ({
        records: state.records.filter((exp) => exp.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));