import { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useIonRouter } from '@ionic/react';
import { useBookingStore } from '../../services/stores/BookingStore';


interface Booking {
  id: string;
  // Add other booking properties here
  [key: string]: any;
}

interface BookingContextType {
  bookings: Booking[];
  booking: Booking | null;
  loading: boolean;
  error: string | null;
  fetchBookingsByDate: (date: string) => Promise<void>;
  fetchBookingsByDateRange: (startDate: string, endDate: string) => Promise<void>;
  fetchBookingById: (id: string) => Promise<void>;
  createBooking: (data: any) => Promise<void>;
  updateBooking: (id: string, data: any) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useIonRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [booking, setBooking] = useState<Booking | null>(null);
  const store = useBookingStore();

  const wrappedFetchBookingsByDate = async (date: string) => {
    try {
  
      const response = await store.fetchBookingsByDate(date);
      if (response.success) {
        setBookings(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch bookings by date');
      console.error('Fetch error:', error);
    } finally {
      
    }
  };

  const wrappedFetchBookingsByDateRange = async (startDate: string, endDate: string) => {
    try {
     
      const response = await store.fetchBookingsByDateRange(startDate, endDate);
      if (response.success) {
        setBookings(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch bookings by date range');
      console.error('Fetch error:', error);
    } finally {
      
    }
  };

  const wrappedFetchBookingById = async (id: string) => {
    try {
     
      const response = await store.fetchBookingById(id);
      if (response.success) {
        setBooking(response.data);
      }
    } catch (error) {
      toast.error(`Failed to fetch booking ${id}`);
      console.error('Fetch error:', error);
    } finally {
      
    }
  };

  const wrappedCreateBooking = async (data: any) => {
    try {
     
      const response = await store.createBooking(data);
      if (response.success) {

        sessionStorage.removeItem("bookingData");
        toast.success('Booking created successfully');
        router.push(`/bookings/${response.data.id}`, 'forward');
      } else {
        toast.error(`Creation failed: ${response.message}`);
      }
    } catch (error) {
      toast.error('Booking creation error');
      console.error('Creation error:', error);
    } finally {
      
    }
  };

  const wrappedUpdateBooking = async (id: string, data: any) => {
    try {
     
      const response = await store.updateBooking(id, data);
      if (response.success) {
        setBookings(prev => prev.map(b => b.id === id ? response.data : b));
        setBooking(prev => prev?.id === id ? response.data : prev);
        toast.success('Booking updated successfully');
        router.push(`/bookings/${id}`, 'forward');
      } else {
        toast.error(`Update failed: ${response.message}`);
      }
    } catch (error) {
      toast.error('Booking update error');
      console.error('Update error:', error);
    } finally {
      
    }
  };

  const wrappedCancelBooking = async (id: string) => {
    try {
     
      const response = await store.cancelBooking(id);
      if (response.success) {
        setBookings(prev => prev.filter(b => b.id !== id));
        setBooking(prev => prev?.id === id ? null : prev);
        toast.success('Booking cancelled successfully');
        router.push('/bookings', 'forward');
      } else {
        toast.error(`Cancellation failed: ${response.message}`);
      }
    } catch (error) {
      toast.error('Booking cancellation error');
      console.error('Cancellation error:', error);
    } finally {
      
    }
  };

  const contextValue = useMemo(() => ({
    bookings,
    booking,
    loading: store.loading,
    error: store.error,
    fetchBookingsByDate: wrappedFetchBookingsByDate,
    fetchBookingsByDateRange: wrappedFetchBookingsByDateRange,
    fetchBookingById: wrappedFetchBookingById,
    createBooking: wrappedCreateBooking,
    updateBooking: wrappedUpdateBooking,
    cancelBooking: wrappedCancelBooking,
  }), [bookings, booking, store.loading, store.error]);

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within a BookingProvider');
  return context;
};