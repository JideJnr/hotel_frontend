import { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useIonRouter } from '@ionic/react';
import { useRoomStore } from '../../services/stores/roomStore';

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = useRoomStore();
  const { loading, error } = store;
  const router = useIonRouter();

  // Local state in context
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [availableRooms, setAvailableRooms] = useState<RoomData[]>([]);

  const wrappedCreateRoom = async (payload: Partial<RoomData>) => {
    try {
      const response = await store.createRoom(payload);

      console.log(response);
      if (response?.success) {
        toast.success('Room created successfully');
        router.push(`/room/${response.room.id}`, 'forward');
        
        await wrappedFetchAllRooms();
      } else {
        toast.error(`Creation failed: ${response?.message}`);
      }
    } catch (error) {
      toast.error('Room creation error');
      console.error('Creation error:', error);
    }
  };

  const wrappedUpdateRoom = async (id: string, payload: Partial<RoomData>) => {
    try {
      const response = await store.updateRoom(id, payload);
      if (response?.success) {
        toast.success('Room updated successfully');
        await wrappedFetchAllRooms();
      } else {
        toast.error(`Update failed: ${response?.message}`);
      }
    } catch (error) {
      toast.error('Room update error');
      console.error('Update error:', error);
    }
  };

  const wrappedFetchAllRooms = async () => {
    try {
      const response = await store.fetchRooms();
      if (response?.success) {
        setRooms(response.data);
      } else {
        toast.error('Failed to fetch rooms');
      }
    } catch (error) {
      toast.error('Failed to fetch rooms');
      console.error('Fetch error:', error);
    }
  };

  const wrappedFetchAvailableRooms = async () => {
    try {
      const response = await store.getAvailableRooms();
      if (response?.success) {
        setAvailableRooms(response.data);
      } else {
        toast.error('Failed to fetch available rooms');
      }
    } catch (error) {
      toast.error('Failed to fetch available rooms');
      console.error('Fetch error:', error);
    }
  };

  const wrappedFetchRoom = async (id: string) => {
    try {
      const response = await store.getRoomById(id);
      return response;
    } catch (error) {
      toast.error(`Failed to fetch room ${id}`);
      console.error('Fetch error:', error);
    }
  };

  const contextValue = useMemo(() => ({
    loading,
    error,
    rooms,
    availableRooms,
    createRoom: wrappedCreateRoom,
    updateRoom: wrappedUpdateRoom,
    fetchRooms: wrappedFetchAllRooms,
    fetchAvailableRooms: wrappedFetchAvailableRooms,
    fetchRoom: wrappedFetchRoom,
  }), [rooms, availableRooms, loading, error]);

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
