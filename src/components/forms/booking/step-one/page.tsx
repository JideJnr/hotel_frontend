import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FormContainer, FormDatePicker } from "../../../../components/forms";
import Button from "../../../../components/button/button";

interface Client {
  id: number;
  name: string;
}

interface Room {
  id: number;
  price: number;
}

interface SelectOption {
  value: number | string | null;
  label: string | null;
}

interface BookingFormData {
  customer: SelectOption | null;
  roomNumber: SelectOption | null;
  bookingInstruction: string;
  checkInDate: string;
  checkOutDate: string;
  paymentType: SelectOption | null;
  paymentMethod: SelectOption | null;
  partPaymentAmount: string;
  price: string;
}

const BookingStepOne = () => {
  const router = useIonRouter();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [formData, setFormData] = useState<BookingFormData>({
    customer: null,
    roomNumber: null,
    bookingInstruction: '',
    checkInDate: tomorrow.toISOString().split('T')[0],
    checkOutDate: '',
    paymentType: null,
    paymentMethod: null,
    partPaymentAmount: '',
    price: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [clients, setClients] = useState<Client[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [user] = useState({ role: "admin" });

  useEffect(() => {
    // Mock data fetching
    setClients([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" }
    ]);
    setRooms([
      { id: 101, price: 15000 },
      { id: 102, price: 20000 }
    ]);
  }, []);

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (user.role !== "customer" && !formData.customer?.value) {
      newErrors.customer = "Customer is required";
    }
    if (!formData.roomNumber?.value) {
      newErrors.roomNumber = "Room number is required";
    }
    if (!formData.checkInDate) {
      newErrors.checkInDate = "Check-in date is required";
    }
    if (!formData.checkOutDate) {
      newErrors.checkOutDate = "Check-out date is required";
    } else if (new Date(formData.checkOutDate) <= new Date(formData.checkInDate)) {
      newErrors.checkOutDate = "Check-out must be after check-in";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const selectedRoom = rooms.find(r => r.id === formData.roomNumber?.value);
      const updatedData: BookingFormData = {
        ...formData,
        price: selectedRoom?.price.toString() || ''
      };

      sessionStorage.setItem("bookingData", JSON.stringify(updatedData));
      router.push("/bookings/create/steptwo", "forward", "replace");
    } else {
      toast.error("Please fix the errors before continuing.");
    }
  };

  const handleSelectChange = (name: keyof BookingFormData, option: SelectOption | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: option,
      ...(name === 'roomNumber' && { price: '' })
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleDateChange = (name: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <IonPage>
      <IonContent>
        <FormContainer 
          title="New Booking" 
          subtitle="Step 1: Select room and dates"
          className="max-w-2xl"
        >
          <div className="space-y-6">
        
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer *
                </label>
                <CustomSelect
                  options={clients.map(client => ({a
                    value: client.id,
                    label: client.name
                  }))}
                  onChange={(option) => handleSelectChange("customer", option)}
                  value={formData.customer}
                  placeholder="Select customer"
                  isInvalid={!!errors.customer}
                />
                {errors.customer && (
                  <p className="mt-1 text-sm text-red-600">{errors.customer}</p>
                )}
              </div>
         

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room *
              </label>
              <CustomSelect
                options={rooms.map(room => ({
                  value: room.id,
                  label: `Room ${room.id} (₦${room.price.toLocaleString()}/night)`
                }))}
                onChange={(option) => handleSelectChange("roomNumber", option)}
                value={formData.roomNumber}
                placeholder="Select room"
                isInvalid={!!errors.roomNumber}
              />
              {errors.roomNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.roomNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormDatePicker
                label="Check-in Date *"
                value={formData.checkInDate}
                onChange={(value) => handleDateChange("checkInDate", value)}
                minDate={new Date().toISOString().split('T')[0]}
                error={errors.checkInDate}
              />

              <FormDatePicker
                label="Check-out Date *"
                value={formData.checkOutDate}
                onChange={(value) => handleDateChange("checkOutDate", value)}
                minDate={formData.checkInDate || new Date().toISOString().split('T')[0]}
                error={errors.checkOutDate}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Instructions
              </label>
              <textarea
                name="bookingInstruction"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Any special requests or notes"
                rows={3}
                value={formData.bookingInstruction}
                onChange={handleTextareaChange}
              />
            </div>

            <div className="pt-4">
              <Button 
                text="Continue" 
                onClick={handleNext}
                className="w-full"
              />
            </div>
          </div>
        </FormContainer>
      </IonContent>
    </IonPage>
  );
};

export default BookingStepOne;