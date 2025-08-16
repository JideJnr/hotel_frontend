import api from './index';

// ===== Records =====
export const getRecordCountForDate = async (date: string) => {
  const res = await api.get(`/computations/record-count`, { params: { date } });
  return res.data;
};

export const getRecordCountForDateRange = async (startDate: string, endDate: string) => {
  const res = await api.get(`/computations/record-count/range`, {
    params: { startDate, endDate },
  });
  return res.data;
};

// ===== Rooms =====
export const getActiveRoomCount = async () => {
  const res = await api.get(`/computations/room-count/active`);
  return res.data;
};

export const getAllRoomCount = async () => {
  const res = await api.get(`/computations/room-count/all`);
  return res.data;
};

// ===== Customers =====
export const getAllCustomerCount = async () => {
  const res = await api.get(`/computations/customer-count/all`);
  return res.data;
};

export const getCustomerRegisteredOnDate = async (date: string) => {
  const res = await api.get(`/computations/customer-count`, { params: { date } });
  return res.data;
};

export const getCustomerRegisteredOnDateRange = async (startDate: string, endDate: string) => {
  const res = await api.get(`/computations/customer-count/range`, {
    params: { startDate, endDate },
  });
  return res.data;
};

export const getActiveCustomerCount = async () => {
  const res = await api.get(`/computations/customer-count/active`);
  return res.data;
};

// ===== Expenses =====
export const getExpensesCountOnDate = async (date: string) => {
  const res = await api.get(`/computations/expenses-count`, { params: { date } });
  return res.data;
};

export const getExpensesCountOnDateRange = async (startDate: string, endDate: string) => {
  const res = await api.get(`/computations/expenses-count/range`, {
    params: { startDate, endDate },
  });
  return res.data;
};

// ===== Bookings =====
export const getBookingCountOnDate = async (date: string) => {
  const res = await api.get(`/computations/booking-count`, { params: { date } });
  return res.data;
};

export const getBookingCountOnDateRange = async (startDate: string, endDate: string) => {
  const res = await api.get(`/computations/booking-count/range`, {
    params: { startDate, endDate },
  });
  return res.data;
};
