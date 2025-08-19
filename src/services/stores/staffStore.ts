import { create } from 'zustand';
import { createStaff, deleteStaff, getAllStaffs, getStaffById, searchStaffs, totalStaff, updateStaff } from '../api/staffApi';


export const useStaffStore = create<StaffState>((set) => ({
  loading: false,
  error: null,

  fetchStaff: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllStaffs();
      set({ loading: false });
      return response;

    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getStaffById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getStaffById(id);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createStaff: async (data: Partial<StaffData>) => {
    set({ loading: true, error: null });
    try {
      const response = await createStaff(data);  
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      // Return a default error response to satisfy the type
      return { success: false, token: '', data: null };
    }
  },

  updateStaff: async (id: string, data: Partial<StaffData>) => {
    set({ loading: true, error: null });
    try {
      const response = await updateStaff(id, data);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteStaff: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteStaff(id);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getTotalStaffCount: async () => {
    set({ loading: true, error: null });
    try {
      const response = await totalStaff();
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  searchStaff: async (query: string) => {
    set({ loading: true, error: null });
    try {
      const response = await searchStaffs(query);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message || "Something went wrong", loading: false });
    }
  },
}));
