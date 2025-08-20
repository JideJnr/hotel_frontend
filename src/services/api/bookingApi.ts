import api from './index';

// --- Types ---
export interface BookingInput {
  customerId: string;
  roomId: string;
  requestId?: string;
  bookingInstruction?: string;
  checkInDate?: string; // ISO format
  checkOutDate?: string; // ISO format
}

export interface BookingUpdate {
  checkInDate?: string;
  checkOutDate?: string;
  bookingInstruction?: string;
}

// --- API FUNCTIONS ---

export const createBooking = async (data: BookingInput) => {
  const res = await api.post('/bookings', data);
  return res.data;
};

export const updateBooking = async (id: string, data: BookingUpdate) => {
  const res = await api.put(`/bookings/${id}`, data);
  return res.data;
};

export const cancelBooking = async (id: string) => {
  const res = await api.delete(`/bookings/${id}`);
  return res.data;
};

export const getBookingById = async (id: string) => {
  const res = await api.get(`/bookings/${id}`);
  return res.data;
};

export const getBookingsByDate = async (
  date: string,
  pageSize?: number,
  lastCreatedAt?: string,
  lastId?: string
) => {
  const res = await api.get('/bookings/by-date', {
    params: { date, pageSize, lastCreatedAt, lastId }
  });
  return res.data;
};

export const getBookingsByFilter = async (
  startDate: string,
  endDate: string,
  pageSize?: number,
  lastCreatedAt?: string,
  lastId?: string,
  rooms?: any
) => {
  const res = await api.get('/bookings/filter', {
    params: { startDate, endDate, rooms, pageSize, lastCreatedAt, lastId }
  });
  return res.data;
};

export const getMyBookings = async (
  pageSize?: number,
  lastCreatedAt?: string,
  lastId?: string
) => {
  const res = await api.get('/bookings/me', {
    params: { pageSize, lastCreatedAt, lastId }
  });
  return res.data;
};
