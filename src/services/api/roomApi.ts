import api from './index';

export const getAllRooms = async () => {
  const res = await api.get('/api/rooms');
  return res.data;
};

export const getAvailableRooms = async () => {
  const res = await api.get('/api/rooms/available');
  return res.data;
};

export const getRoomById = async (id: string) => {
  const res = await api.get(`/api/rooms/${id}`);
  return res.data;
};

export const createRoom = async (data: Partial<Room>) => {
  const res = await api.post('/api/rooms', data);
  return res.data;
};

export const updateRoom = async (id: string, data: Partial<Room>) => {
  const res = await api.put(`/api/rooms/${id}`, data);
  return res.data;
};

export const deleteRoom = async (id: string) => {
  const res = await api.delete(`/api/rooms/${id}`);
  return res.data;
};
