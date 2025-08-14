import { create } from 'zustand';
import * as bookingApi from '../api/bookingApi';


interface BookingState {

  loading: boolean;
  error: string | null;

  fetchBookingsByDate: (date: string) => Promise<Response>;
  fetchBookingsByDateRange: (startDate: string, endDate: string) => Promise<Response>;
  fetchBookingById: (id: string) => Promise<Response>;
  createBooking: (data: bookingApi.BookingInput) => Promise<Response>;
  updateBooking: (id: string, data: bookingApi.BookingUpdate) => Promise<Response>;
  cancelBooking: (id: string) => Promise<Response>;
}

export const useBookingStore = create<BookingState>((set) => ({

  loading: false,
  error: null,

  fetchBookingsByDate: async (date) => {
    set({ loading: true, error: null });
    try {
      const response = await bookingApi.getBookingsByDate(date);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchBookingsByDateRange: async (startDate, endDate) => {
    set({ loading: true, error: null });
    try {
      const response = await bookingApi.getBookingsByDateRange(startDate, endDate);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchBookingById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await bookingApi.getBookingById(id);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  createBooking: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await bookingApi.createBooking(data);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  updateBooking: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await bookingApi.updateBooking(id, data);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  cancelBooking: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await bookingApi.cancelBooking(id);
      set({ loading: false });
      return response;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));