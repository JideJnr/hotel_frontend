import { create } from 'zustand';
import * as api from '../api';
import { createRoom, deleteRoom, getAllRooms, getAvailableRooms, getRoomById, updateRoom } from '../api/roomApi';



export const useRoomStore = create<RoomState>((set, get) => ({
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
  },

  getRoomById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getRoomById(id);
      if (!response.success) throw new Error(response.error || 'Room not found');
      set({ currentRoom: response.room, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createRoom: async (data: Partial<RoomData>) => {
    set({ loading: true, error: null });
    try {
      const response = await createRoom(data);
      if (!response.success) throw new Error(response.error || 'Failed to create room');
      
      set((state) => ({
        rooms: [...state.rooms, response.room],
        // Add to available rooms if new room is available
        availableRooms: response.room.isAvailable 
          ? [...state.availableRooms, response.room] 
          : state.availableRooms,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateRoom: async (id: string, data: Partial<RoomData>) => {
    set({ loading: true, error: null });
    try {
      const response = await updateRoom(id, data);
      if (!response.success) throw new Error(response.error || 'Failed to update room');
      
      set((state) => {
        const updatedRooms = state.rooms.map(room => 
          room.id === id ? response.room : room
        );
        
        // Update available rooms list
        const updatedAvailableRooms = state.availableRooms.filter(room => room.id !== id);
        if (response.room.isAvailable) {
          updatedAvailableRooms.push(response.room);
        }
        
        return {
          rooms: updatedRooms,
          availableRooms: updatedAvailableRooms,
          currentRoom: state.currentRoom?.id === id ? response.room : state.currentRoom,
          loading: false
        };
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteRoom: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteRoom(id);
      if (!response.success) throw new Error(response.error || 'Failed to delete room');
      
      set((state) => ({
        rooms: state.rooms.filter(room => room.id !== id),
        availableRooms: state.availableRooms.filter(room => room.id !== id),
        currentRoom: state.currentRoom?.id === id ? null : state.currentRoom,
        loading: false
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));