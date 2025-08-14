import api from './index';

export const getAllRooms = async () => {
  const res = await api.get('/rooms');
  return res.data;
};

export const getAvailableRooms = async () => {
  const res = await api.get('/rooms/available');
  return res.data;
};

export const getRoomById = async (id: string) => {
  const res = await api.get(`/rooms/${id}`);
  return res.data;
};

export const createRoom = async (data: Partial<Room>) => {
  const res = await api.post('/rooms', data);
  return res.data;
};

export const updateRoom = async (id: string, data: Partial<Room>) => {
  const res = await api.put(`/rooms/${id}`, data);
  return res.data;
};

export const deleteRoom = async (id: string) => {
  const res = await api.delete(`/rooms/${id}`);
  return res.data;
};
