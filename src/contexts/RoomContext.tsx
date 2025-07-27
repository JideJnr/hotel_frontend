import { createContext, useContext, ReactNode } from 'react';
import { useRoomStore } from '../stores/roomStore';

interface RoomContextType {

}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

const { rooms, currentRoom ,createRoom,fetchRooms, loading, error } = useRoomStore();

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
 
  return (
    <RoomContext.Provider value={{
      currentRoom,
      rooms,
      createRoom,
      fetchRooms,
      loading,
      error
    }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) throw new Error('useRoom must be used within an RoomProvider');
  return context;
};
