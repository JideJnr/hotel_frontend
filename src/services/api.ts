import axios from 'axios';

const BASE_URL = 'https://bj-hotel-api.onrender.com';

export interface Room {
  id: string;
  number: string;
  type: string;
  price: number;
  capacity: number;
  amenities: string[];
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface GetAllRoomsResponse {
  success: true;
  count: number;
  rooms: Room[];
}

interface GetAvailableRoomsResponse {
  success: true;
  count: number;
  rooms: Room[];
}

interface SingleRoomResponse {
  success: true;
  room: Room;
}

interface DeleteRoomResponse {
  success: true;
  message: string;
}


interface ApiErrorResponse {
  success: false;
  error: string;
}

interface LoginSuccessResponse {
  success: true;
  token: string;
  user: {
    uid: string;
    email: string;
    firstName: string;
    role: string;
  };
}


interface SignupSuccessResponse {
  success: true;
  token: string;
  user: {
    uid: string;
    email: string;
    firstName: string;
    role: string;
  }
}


export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  createdAt?: any;
  updatedAt?: any;
}

interface GetAllCustomersResponse {
  success: true;
  count: number;
  customers: Customer[];
}

interface SingleCustomerResponse {
  success: true;
  customer: Customer;
}

interface DeleteCustomerResponse {
  success: true;
  message: string;
}


export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  receiptUrl?: string;
}

interface GetAllExpensesResponse {
  success: true;
  count: number;
  expenses: Expense[];
}

interface SingleExpenseResponse {
  success: true;
  expense: Expense;
}

interface DeleteExpenseResponse {
  success: true;
  message: string;
}

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
  const response = await api.post<SingleRoomResponse | ApiErrorResponse>('/api/rooms', data);
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