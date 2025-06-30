import axios from 'axios';
import { ApiErrorResponse, Customer, DeleteCustomerResponse, DeleteExpenseResponse, DeleteRoomResponse, Expense, GetAllExpensesResponse, GetAllRoomsResponse, GetAvailableRoomsResponse, Room, SingleCustomerResponse, SingleExpenseResponse, SingleRoomResponse } from '../interfaces/interface';

const BASE_URL = 'https://bj-hotel-api.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  // You can set default headers here if needed
  // headers: { 'Authorization': `Bearer ${token}` }
});

export const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post<LoginSuccessResponse | ApiErrorResponse>(
    '/api/v1/auth/signin', 
    credentials
  );
  return response.data; 
};

export const signup = async (credentials: { email: string; password: string }) => {
  const response = await api.post<SignupSuccessResponse | ApiErrorResponse>(
    '/api/v1/auth/signup', 
    credentials
  );
  return response.data; 
};

export const logout = () => api.post('/api/v1/auth/logout');

export const getRooms = () => api.get('/api/rooms');

export const getAllCustomers = async () => {
  const response = await api.get<GetAllCustomersResponse | ApiErrorResponse>('/api/customers');
  return response.data;
};

export const getCustomerById = async (id: string) => {
  const response = await api.get<SingleCustomerResponse | ApiErrorResponse>(`/api/customers/${id}`);
  return response.data;
};

export const createCustomer = async (data: Partial<Customer>) => {
  const response = await api.post<SingleCustomerResponse | ApiErrorResponse>('/api/customers', data);
  return response.data;
};

export const updateCustomer = async (id: string, data: Partial<Customer>) => {
  const response = await api.put<SingleCustomerResponse | ApiErrorResponse>(`/api/customers/${id}`, data);
  return response.data;
};

export const deleteCustomer = async (id: string) => {
  const response = await api.delete<DeleteCustomerResponse | ApiErrorResponse>(`/api/customers/${id}`);
  return response.data;
};

export const createRoom = async (data: Partial<Room>) => {
  const response = await api.post<SingleRoomResponse  | ApiErrorResponse>('/api/rooms', data);
  return response.data;
};

export const getAllRooms = async () => {
  const response = await api.get<GetAllRoomsResponse | ApiErrorResponse>('/api/rooms');
  return response.data;
};

export const getAvailableRooms = async () => {
  const response = await api.get<GetAvailableRoomsResponse | ApiErrorResponse>('/api/rooms/available');
  return response.data;
};

export const getRoomById = async (id: string) => {
  const response = await api.get<SingleRoomResponse | ApiErrorResponse>(`/api/rooms/${id}`);
  return response.data;
};

export const updateRoom = async (id: string, data: Partial<Room>) => {
  const response = await api.put<SingleRoomResponse | ApiErrorResponse>(`/api/rooms/${id}`, data);
  return response.data;
};

export const deleteRoom = async (id: string) => {
  const response = await api.delete<DeleteRoomResponse | ApiErrorResponse>(`/api/rooms/${id}`);
  return response.data;
};


export const createExpense = async (data: Partial<Expense>) => {
  const response = await api.post<SingleExpenseResponse | ApiErrorResponse>('/api/expenses', data);
  return response.data;
};

export const getAllExpenses = async () => {
  const response = await api.get<GetAllExpensesResponse | ApiErrorResponse>('/api/expenses');
  return response.data;
};

export const updateExpense = async (id: string, data: Partial<Expense>) => {
  const response = await api.put<SingleExpenseResponse | ApiErrorResponse>(`/api/expenses/${id}`, data);
  return response.data;
};

export const deleteExpense = async (id: string) => {
  const response = await api.delete<DeleteExpenseResponse | ApiErrorResponse>(`/api/expenses/${id}`);
  return response.data;
};

export default api;