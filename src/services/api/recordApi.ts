import axios from 'axios';

const BASE_URL = 'https://bj-hotel-api.onrender.com/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
});

// Set JWT token for every request
export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// --- Types ---
export interface RecordInput {
  customerId: string;
  roomNumberId: string;
  paymentMethodId: string;
  requestId: string;
  bookingInstruction: string;
}

export interface Record {
  id: string;
  customerId: string;
  roomNumberId: string;
  paymentMethodId: string;
  requestId: string;
  bookingInstruction: string;
  userId: string;
  createdAt: string; // ISO format
  updatedAt: string; // ISO format
}

export interface PaginationParams {
  pageSize?: number;
  lastCreatedAt?: string; // ISO format
  lastId?: string;
}

export interface DateRangeParams extends PaginationParams {
  startDate: string; // Date string (YYYY-MM-DD)
  endDate: string; // Date string (YYYY-MM-DD)
}

export interface RecordsResponse {
  success: boolean;
  message: string;
  data: {
    count: number;
    records: Record[];
    nextPage?: {
      lastCreatedAt: string;
      lastId: string;
    };
  };
}

export interface SingleRecordResponse {
  success: boolean;
  message: string;
  data: Record;
}

// --- API Functions ---

// Create a new sales record
export const createRecord = async (data: RecordInput) => {
  const res = await api.post('/records', data);
  return res.data as { success: boolean; message: string; recordId: string };
};

// Update a sales record
export const updateRecord = async (id: string, data: RecordInput) => {
  const res = await api.put(`/records/${id}`, data);
  return res.data as { success: boolean; message: string };
};

// Delete a sales record
export const deleteRecord = async (id: string) => {
  const res = await api.delete(`/records/${id}`);
  return res.data as { success: boolean; message: string };
};

// Get today's sales records
export const getTodayRecords = async (params?: PaginationParams) => {
  const res = await api.get('/records/today', { params });
  return res.data as RecordsResponse;
};

// Get records within a date range
export const getRecordsByDateRange = async (params: DateRangeParams) => {
  const res = await api.get('/records/range', { params });
  return res.data as RecordsResponse;
};

// Get record by ID
export const getRecordById = async (id: string) => {
  const res = await api.get(`/records/${id}`);
  return res.data as SingleRecordResponse;
};

// Get authenticated user's records
export const getUserRecords = async (params?: PaginationParams) => {
  const res = await api.get('/records/user', { params });
  return res.data as RecordsResponse;
};