import api from './index';


export const fetchMyActivity = async (
  pageSize?: number,
  lastCreatedAt?: string,
  lastId?: string
) => {
  const res = await api.get('/activity', {
    params: { pageSize, lastCreatedAt, lastId }
  });
  return res.data;
};
