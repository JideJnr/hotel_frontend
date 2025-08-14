import { create } from 'zustand';
import { createRoom, deleteRoom, getAllRooms, getAvailableRooms, getRoomById, updateRoom } from '../api/roomApi';

export const useRoomStore = create<RoomState>((set) => ({
  loading: false,
  error: null,

  fetchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllRooms();
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getAvailableRooms: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAvailableRooms();
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getRoomById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getRoomById(id);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createRoom: async (data: Partial<RoomData>) => {
    set({ loading: true, error: null });
    try {
      const response = await createRoom(data);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateRoom: async (id: string, data: Partial<RoomData>) => {
    set({ loading: true, error: null });
    try {
      const response = await updateRoom(id, data);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteRoom: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteRoom(id);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
