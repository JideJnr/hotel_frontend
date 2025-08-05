import { create } from 'zustand';
import * as api from '../api';
import { createRecord } from '../api/recordApi';



export const useRecordStore = create<any>((set) => ({
  records: [],
  record:null,
  loading: false,
  error: null,

  fetchRecords: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllTodaysRecord();
      
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

  createRecord: async (payload: any) => {
    set({ loading: true, error: null });
    try {
      const response = await createRecord(payload);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to create record');
      }
      set({ record: response.record, loading: false });
      return response
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  }
  
}));