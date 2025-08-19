import api from './index';

export const getAllStaffs = async () => {
  const res = await api.get('/staffs');
  return res.data;
};

export const getStaffById = async (id: string) => {
  const res = await api.get(`/staffs/${id}`);
  return res.data;
};

export const createStaff = async (data: any) => {
  const res = await api.post('/staffs', data);
  return res.data;
};

export const updateStaff = async (id: string, data: any) => {
  const res = await api.put(`/staffs/${id}`, data);
  return res.data;
};

export const deleteStaff = async (id: string) => {
  const res = await api.delete(`/staffs/${id}`);
  return res.data;
};

export const totalStaff = async () => {
  const res = await api.delete(`/staffs/count`);
  return res.data;
};

export const searchStaffs = async (query: string) => {
  const res = await api.get(`/staffs/search`, {
    params: { query }
  });
  return res.data;
};
