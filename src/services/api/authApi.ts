import api from './index';

type AuthCredentials = { email: string; password: string };

export const login = async (credentials: AuthCredentials) => {
  const res = await api.post('/api/v1/auth/signin', credentials);
  return res.data;
};

export const signup = async (credentials: AuthCredentials) => {
  const res = await api.post('/api/v1/auth/signup', credentials);
  return res.data;
};

export const logout = async () => {
  const res = await api.post('/api/v1/auth/logout');
  return res.data;
};