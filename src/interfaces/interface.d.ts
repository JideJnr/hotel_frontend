interface Response {
  success: true;
  message: string;
  data: any
}

interface RoomData {
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

interface CustomerData {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  createdAt?: any;
  updatedAt?: any;
}

interface ExpensesData {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  receiptUrl?: string;
}

interface SalesData  {
  customerId: string | null;
  roomNumberId: string| null;
  paymentMethodId: string| null;
  requestId: string | null,
  bookingInstruction: string;
};

interface RecordData {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  receiptUrl?: string;
}

interface RecordState {
  record: null;
  records: Record[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchRecords: () => Promise<any>;
  createRecord: (payload: any) => Promise<void>;
  updateRecord: (id: string, data: Partial<Record>) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
}


interface RoomState {
  loading: boolean;
  error: string | null;

  // Actions
  fetchRooms: () => Promise<void>;
  getAvailableRooms: () => Promise<void>;
  getRoomById: (id: string) => Promise<void>;
  createRoom: (data: Partial<Room>) => Promise<void>;
  updateRoom: (id: string, data: Partial<Room>) => Promise<void>;
  deleteRoom: (id: string) => Promise<void>;
}

interface CustomerData {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  createdAt?: any;
  updatedAt?: any;
}

interface CustomerState {

  loading: boolean;
  error: string | null;

  fetchCustomer: () => Promise<Response>;
  getCustomerById: (id: string) => Promise<Response>;
  createCustomer: (data: Partial<Customer>) => Promise<Response>;
  updateCustomer: (id: string, data: Partial<Customer>) => Promise<Response>;
  deleteCustomer: (id: string) => Promise<Response>;
  getTotalCustomerCount: () => Promise<Response>;
  getCustomerRegisteredOnDate:(date: string) => Promise<Response>;
  getCustomerRegisteredOnDateRange:(params: any) => Promise<Response>;

}

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchExpenses: () => Promise<void>;
  createExpense: (data: Partial<Expense>) => Promise<void>;
  updateExpense: (id: string, data: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

interface AuthState {
  user: {
    uid: string;
    email: string;
    firstName: string;
    role: string;
  } | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (payload:any) => Promise<void>;
}

interface ButtonProps {
  text: string;
  loadingText?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  svg?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

interface FormContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}


interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  onChange?: any;
}

interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  className?: string;
}

interface Option {
  value: string | number;
  label: string;
};

interface Props {
  label: string;
  name: string;
  value: Option | null;
  onChange: (opt: Option | null) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  required?: boolean;
  className?: string;
}

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

interface FormHeaderProps {
  backUrl?: string;
  className?: string;
}

interface FormFooterProps {
  promptText: string;
  linkText: string;
  linkPath: string;
  className?: string;
}

interface FormDatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
  maxDate?: string;
  error?: string;
  className?: string;
  required?: boolean;
}

interface BookingData {
  customerId: number | null;
  customerName: string | null;
  roomId: number | null;
  roomLabel: string | null;
  bookingInstruction: string;
  checkInDate: string;
  checkOutDate: string;
  paymentMethodId: string | null;
  paymentMethodLabel: string | null;
  price: string;
};

interface RecordContextType {
  records: Record[];
  record: Record | null;
  loading: boolean;
  error: string | null;
  createRecord: (payload: any) => Promise<void>;
  updateRecord: (id: string, payload: any) => Promise<void>;
  fetchRecords: () => Promise<void>;
  fetchRecord: (id: string) => Promise<void>;
}

interface Room {
  id: string;
  // Add other room properties here
}

interface RoomContextType {
  rooms: Room[];
  currentRoom: Room | null;
  loading: boolean;
  error: string | null;
  createRoom: (payload: any) => Promise<Response>;
  updateRoom: (id: string, payload: any) => Promise<Response>;
  fetchRooms: () => Promise<Response>;
  fetchRoom: (id: string) => Promise<Response>;
}

// Add this interface for booking data
interface Booking {
  id: string;
  customerId: string;
  roomId: string;
  userId: string;
  requestId?: string;
  bookingInstruction?: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'active' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
  cancelledAt?: string;
}

interface CreateBookingInput {
  customerId: string;
  roomId: string;
  requestId?: string;
  bookingInstruction?: string;
  checkInDate: string;
  checkOutDate: string;
}

interface UpdateBookingInput {
  checkInDate?: string;
  checkOutDate?: string;
  bookingInstruction?: string;
}

interface PaginatedBookingsResponse {
  success: boolean;
  message: string;
  data: {
    count: number;
    bookings: Booking[];
    nextPage?: {
      lastCreatedAt: string;
      lastId: string;
    };
  };
}

interface SingleBookingResponse {
  success: boolean;
  message: string;
  data: Booking;
}

interface BasicResponse {
  success: boolean;
  message: string;
}
