import api from './index';

// --- Types ---
export interface RecordInput {
  customerId: string;
  customerName: string;
  roomId: string;
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



// --- API Functions ---

// Create a new sales record
export const createRecord = async (data: RecordInput) => {
  const response = await api.post('/records', data);
  return response.data;
};

// Update a sales record
export const updateRecord = async (id: string, data: RecordInput) => {
  const response = await api.put(`/records/${id}`, data);
  return response.data;
};

// Delete a sales record
export const deleteRecord = async (id: string) => {
  const response = await api.delete(`/records/${id}`);
  return response.data;
};

// Get today's sales records
export const getTodayRecords = async (params?: PaginationParams) => {
  const response = await api.get('/records/today', { params });
  return response.data;
};

// Get records within a date range
export const getRecordsByDateRange = async (params: DateRangeParams) => {
  const response = await api.get('/records/range', { params });
  return response.data;
};

// Get record by ID
export const getRecordById = async (id: string) => {
  const response = await api.get(`/records/${id}`);
  return response.data;
};

// Get authenticated user's records
export const getUserRecords = async (params?: PaginationParams) => {
  const response = await api.get('/records/user', { params });
  return response.data;
};