import { create } from 'zustand';
import * as api from '../api';
import { getAllRooms, getAvailableRooms } from '../api/roomApi';



export const useRoomStore = create<any>((set, get) => ({
  rooms: [],
  availableRooms: [],
  currentRoom: null,
  loading: false,
  error: null,

  fetchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllRooms();
      if (!response.success) throw new Error(response.error || 'Failed to fetch rooms');
      set({ rooms: response.rooms, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getAvailableRooms: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAvailableRooms();
      if (!response.success) throw new Error(response.error || 'Failed to fetch available rooms');
      set({ availableRooms: response.rooms, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  }


}));