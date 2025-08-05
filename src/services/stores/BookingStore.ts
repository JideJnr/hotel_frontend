import { create } from 'zustand';
import * as bookingApi from '../api/bookingApi';

interface BookingState {
  bookings: any[];
  booking: any | null;
  loading: boolean;
  error: string | null;

  fetchBookingsByDate: (date: string) => Promise<void>;
  fetchBookingsByDateRange: (startDate: string, endDate: string) => Promise<void>;
  fetchBookingById: (id: string) => Promise<void>;
  createBooking: (data: bookingApi.BookingInput) => Promise<void>;
  updateBooking: (id: string, data: bookingApi.BookingUpdate) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  booking: null,
  loading: false,
  error: null,

  fetchBookingsByDate: async (date) => {
    set({ loading: true, error: null });
    try {
      const response = await bookingApi.getBookingsByDate(date);
      set({ bookings: response.bookings || [], loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchBookingsByDateRange: async (startDate, endDate) => {
    set({ loading: true, error: null });
    try {
      const response = await bookingApi.getBookingsByDateRange(startDate, endDate);
      set({ bookings: response.bookings || [], loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchBookingById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await bookingApi.getBookingById(id);
      set({ booking: response.booking || null, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createBooking: async (data) => {
    set({ loading: true, error: null });
    try {
      await bookingApi.createBooking(data);
      set({ loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateBooking: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await bookingApi.updateBooking(id, data);
      const updated = response.booking;
      set((state) => ({
        bookings: state.bookings.map((b) => (b.id === id ? updated : b)),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  cancelBooking: async (id) => {
    set({ loading: true, error: null });
    try {
      await bookingApi.cancelBooking(id);
      set((state) => ({
        bookings: state.bookings.filter((b) => b.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
