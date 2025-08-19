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
  customerId?: string | null;
  customerName?: string | null;
  roomName?: string| null;
  roomId?: string| null;
  paymentMethodId?: string| null;
  paymentMethodLabel?: string| null;
  requestId?: string | null,
  requestLabel?: string | null,
  bookingInstruction?: string;
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

interface BookingData {
  customerId?: string | null;
  customerName?: string | null;
  roomId?: string | null;
  roomName?: string | null;
  bookingInstruction?: string| null;
  checkInDate?: string;
  checkOutDate?: string;
  paymentMethodId?: string | null;
  paymentMethodLabel?: string | null;
  price?: string| null;
};


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
  fetchRooms: () => Promise<Response>;
  getAvailableRooms: () => Promise<Response>;
  getRoomById: (id: string) => Promise<Response>;
  createRoom: (data: Partial<Room>) => Promise<Response>;
  updateRoom: (id: string, data: Partial<Room>) => Promise<Response>;
  deleteRoom: (id: string) => Promise<Response>;
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
  getCustomerRegisteredOnDate: (date:string) => Promise<Response>;
  getCustomerRegisteredOnDateRange: (params:any) => Promise<Response>;
  searchCustomer:(query: string) => Promise<Response>;
}

interface StaffState {

  loading: boolean;
  error: string | null;

  fetchStaff: () => Promise<Response>;
  getStaffById: (id: string) => Promise<Response>;
  createStaff: (data: Partial<Customer>) => Promise<Response>;
  updateStaff: (id: string, data: Partial<Customer>) => Promise<Response>;
  deleteStaff: (id: string) => Promise<Response>;
  getTotalStaffCount: () => Promise<Response>;
  searchStaff:(query: string) => Promise<Response>;
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
  value: any;
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


interface RoomContextType {
  rooms: Room[];
  currentRoom: Room | null;
  availableRooms: Room[];
  loading: boolean;
  error: string | null;
  createRoom: (payload: any) => Promise<void>;
  updateRoom: (id: string, payload: any) => Promise<void>;
  fetchRooms: () => Promise<void>;
  fetchAvailableRooms: () => Promise<void>;
  fetchRoom: (id: string) => Promise<void>;
}

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

interface Expense {
  id: string;
  category: string;
  amount: number;
  description?: string;
  paymentMethod?: string;
  reference?: string;
  date?: string;
  receiptURL?: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  expense: Expense | null;
  loading: boolean;
  error: string | null;

  createExpense: (payload: Partial<Expense>) => Promise<void>;
  updateExpense: (id: string, payload: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<any>;
  fetchExpense: (id: string) => Promise<any>;
  fetchExpenses: (params?: { startDate?: string; endDate?: string; pageSize?: number }) => Promise<void>;
  fetchTodayExpenses: () => Promise<void>;
  fetchExpensesOnDate: (id: string) => Promise<void>;
  fetchExpensesByCategory: (category: string, params?: { pageSize?: number }) => Promise<void>;
  fetchExpenseSummary: (params: { startDate: string; endDate: string }) => Promise<any>;
}
