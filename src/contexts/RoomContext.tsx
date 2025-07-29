import { createContext, useContext, ReactNode, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useRoomStore } from '../services/stores/ActivityStore';

interface Room {
  id: string;
  // Add other room properties here
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface RoomContextType {
  rooms: Room[];
  currentRoom: Room | null;
  loading: boolean;
  error: string | null;
  createRoom: (payload: any) => Promise<void>;
  updateRoom: (id: string, payload: any) => Promise<void>;
  fetchRooms: () => Promise<void>;
  fetchRoom: (id: string) => Promise<void>;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = useRoomStore();
  const { rooms, currentRoom, loading, error } = store;

  const wrappedCreateRoom = async (payload: any) => {
    try {
      const response = await store.createRoom(payload);
      if (response.success) {
        toast.success('Room created successfully');
      } else {
        toast.error(`Creation failed: ${response.message}`);
      }
    } catch (error) {
      toast.error('Room creation error');
      console.error('Creation error:', error);
    }
  };

  const wrappedUpdateRoom = async (id: string, payload: any) => {
    try {
      const response = await store.updateRoom(id, payload);
      if (response.success) {
        toast.success('Room updated successfully');
      } else {
        toast.error(`Update failed: ${response.message}`);
      }
    } catch (error) {
      toast.error('Room update error');
      console.error('Update error:', error);
    }
  };

  const wrappedFetchRooms = async () => {
    try {
      await store.fetchRooms();
    } catch (error) {
      toast.error('Failed to fetch rooms');
      console.error('Fetch error:', error);
    }
  };

  const wrappedFetchRoom = async (id: string) => {
    try {
      await store.fetchRoom(id);
    } catch (error) {
      toast.error(`Failed to fetch room ${id}`);
      console.error('Fetch error:', error);
    }
  };

  const contextValue = useMemo(() => ({
    rooms,
    currentRoom,
    loading,
    error,
    createRoom: wrappedCreateRoom,
    updateRoom: wrappedUpdateRoom,
    fetchRooms: wrappedFetchRooms,
    fetchRoom: wrappedFetchRoom,
  }), [rooms, currentRoom, loading, error]);

  return (
    <RoomContext.Provider value={contextValue}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) throw new Error('useRoom must be used within a RoomProvider');
  return context;
};