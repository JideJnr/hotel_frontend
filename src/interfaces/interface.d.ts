interface AuthSuccessResponse {
  success: true;
  token: string;
  user: {
    uid: string;
    email: string;
    firstName: string;
    role: string;
  };
}

interface Response {
  success: true;
  token: string;
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
  customerName: string | null;
  customerId: string | null;
  roomNumberId: string| null;
  roomNumberLabel: string| null;
  paymentMethodId: string| null;
  paymentMethodLabel: string| null;
  requestId: string | null,
  requestLabel: string | null,
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
  rooms: Room[];
  availableRooms: Room[];
  currentRoom: Room | null;
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
  customers: Customer[];
  customer: Customer | null;
  loading: boolean;
  error: string | null;

  fetchCustomer: () => Promise<void>;
  getCustomerById: (id: string) => Promise<void>;
  createCustomer: (data: Partial<Customer>) => Promise<void>;
  updateCustomer: (id: string, data: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
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
