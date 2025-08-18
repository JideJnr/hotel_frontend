import { IonPage, useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  BackFormContainer,
  FormDatePicker,
  FormHeader,
  FormTextarea
} from "../../../../components/forms";
import Button from "../../../../components/button/button";
import FormSelect from "../../FormSelect";
import { useRoom } from "../../../../contexts/data/RoomContext";
import { useCustomer } from "../../../../contexts/data/CustomerContext";
import { paymentOptions } from "../../../../utils/enum";

// -------------------
// Types
// -------------------
type BookingData = {
  customerId: number | null;
  customerName: string | null;
  roomId: number | null;
  roomLabel: string | null;
  bookingInstruction: string;
  checkInDate: string;
  checkOutDate: string;
  paymentMethodId: number | null;
  paymentMethodLabel: string | null;
  price: string;
};

type Errors = {
  customer?: string;
  roomId?: string;
  checkInDate?: string;
  checkOutDate?: string;
};

export default function BookingStepOne() {
  const router = useIonRouter();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // -------------------
  // State
  // -------------------
  const [formData, setFormData] = useState<BookingData>({
    customerId: null,
    customerName: null,
    roomId: null,
    roomLabel: null,
    bookingInstruction: "",
    checkInDate: tomorrow.toISOString().split("T")[0], // defaults to tomorrow
    checkOutDate: "",
    paymentMethodId: null,
    paymentMethodLabel: null,
    price: ""
  });

  const [errors, setErrors] = useState<Errors>({});

  const { fetchCustomers, customers } = useCustomer();
  const { fetchRooms, rooms } = useRoom();

  // -------------------
  // Validation + Next
  // -------------------
const handleNext = () => {
  const errs: Errors = {};

  // ✅ Basic validations
  if (!formData.customerId) errs.customer = "Customer is required";
  if (!formData.roomId) errs.roomId = "Room is required";
  if (!formData.checkInDate) errs.checkInDate = "Check-in date is required";
  if (!formData.checkOutDate) {
    errs.checkOutDate = "Check-out date is required";
  } else if (
    new Date(formData.checkOutDate) <= new Date(formData.checkInDate)
  ) {
    errs.checkOutDate = "Check-out must be after check-in";
  }

  setErrors(errs);

  // ✅ If no errors → save & navigate
  if (Object.keys(errs).length === 0) {
    const updatedData: BookingData = {
      ...formData, // only booking info, no price calculation here
    };

    sessionStorage.setItem("bookingData", JSON.stringify(updatedData));

    router.push("/register/booking/steptwo", "forward", "replace");
  } else {
    toast.error("Please fix the errors before continuing.");
  }
};

  // -------------------
  // Fetch data
  // -------------------
  useEffect(() => {
    fetchCustomers();
    fetchRooms();
  }, []);

  // -------------------
  // Render
  // -------------------
  return (
    <IonPage>
      <FormHeader />

      <BackFormContainer
        title="New Booking"
        subtitle="Step 1: Select room and dates"
        className="max-w-2xl"
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            handleNext();
          }}
          className="space-y-6"
        >
          {/* Customer Select */}
          <FormSelect
            label="Customer *"
            name="customer"
            value={
              formData.customerId != null
                ? { value: formData.customerId, label: formData.customerName! }
                : null
            }
            onChange={opt =>
              setFormData(fd => ({
                ...fd,
                customerId: opt ? opt.value : null,
                customerName: opt ? opt.label : null
              }))
            }
            options={customers.map(c => ({
              value: c.id,
              label: c.userName
            }))}
            placeholder="Select a customer"
            error={errors.customer}
            required
          />

          {/* Room Select */}
          <FormSelect
            label="Room *"
            name="room"
            value={
              formData.roomId != null
                ? { value: formData.roomId, label: formData.roomLabel! }
                : null
            }
            onChange={opt =>
              setFormData(fd => ({
                ...fd,
                roomId: opt ? opt.value : null,
                roomLabel: opt ? opt.label : null
              }))
            }
            options={rooms.map(r => ({
              value: r.id,
              label: `Room ${r.name}`
            }))}
            placeholder="Select a room"
            error={errors.roomId}
            required
          />

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormDatePicker
              label="Check-in Date *"
              value={formData.checkInDate}
              onChange={value =>
                setFormData(fd => ({
                  ...fd,
                  checkInDate: value
                }))
              }
              minDate={today.toISOString().split("T")[0]}
              error={errors.checkInDate}
            />

            <FormDatePicker
              label="Check-out Date *"
              value={formData.checkOutDate}
              onChange={value =>
                setFormData(fd => ({
                  ...fd,
                  checkOutDate: value
                }))
              }
              minDate={formData.checkInDate}
              error={errors.checkOutDate}
            />
          </div>

                    <FormSelect
            label="Payment Method"
            name="paymentMethod"
            value={
              formData.paymentMethodId != null
                ? { value: formData.paymentMethodId, label: formData.paymentMethodLabel! }
                : null
            }
            onChange={opt => setFormData(fd => ({
              ...fd,
              paymentMethodId: opt ? String(opt.value) : null,
              paymentMethodLabel: opt ? opt.label : null
            }))}
            options={paymentOptions}
            placeholder="Select payment method"
          />



          {/* Notes */}
          <FormTextarea
            label="Special Instructions"
            name="bookingInstruction"
            value={formData.bookingInstruction}
            onChange={e =>
              setFormData(fd => ({
                ...fd,
                bookingInstruction: e.target.value
              }))
            }
            placeholder="Any special requests or notes"
            rows={3}
          />

          {/* Submit */}
          <div className="pt-4">
            <Button text="Continue" type="submit" className="w-full" />
          </div>
        </form>
      </BackFormContainer>
    </IonPage>
  );
}
