export const typeLabels: Record<string, (act: any) => string> = {
  booking_created: (act) => "Created a new booking",
  booking_updated: (act) => "Modified a booking",
  booking_cancelled: (act) => "Cancelled a booking",

  customer_created: (act) => "Created a new customer",
  customer_updated: (act) => "Modified customer details",
  customer_deleted: (act) => "Deleted a customer",

  expense_created: (act) => `Created a new expense `,
  expense_updated: (act) => "Modified an expense",
  expense_deleted: (act) => "Deleted an expense",

  record_created: (act) => `Sold room`,
  record_updated: (act) => "Modified sales record",
  record_deleted: (act) => "Deleted sales record",
};

export const options: Option[] = [
  { value: "sales", label: "Sales" },
  { value: "customers", label: "Customers" },
  { value: "expenses", label: "Expenses" },
  { value: "bookings", label: "Bookings" },
];
