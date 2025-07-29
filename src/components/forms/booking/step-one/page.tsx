import { IonPage, IonContent, useIonRouter } from "@ionic/react";
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

type Client = { id: number; name: string };
type Room = { id: number; price: number };


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

  const [formData, setFormData] = useState<BookingData>({
    customerId: null,
    customerName: null,
    roomId: null,
    roomLabel: null,
    bookingInstruction: '',
    checkInDate: tomorrow.toISOString().split('T')[0],
    checkOutDate: '',
    paymentMethodId: null,
    paymentMethodLabel: null,
    price: ''
  });

  const [errors, setErrors] = useState<Errors>({});
  const [clients, setClients] = useState<Client[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
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
    const errs: Errors = {};

    if (!formData.customerId) errs.customer = "Customer is required";
    if (!formData.roomId) errs.roomId = "Room is required";
    if (!formData.checkInDate) errs.checkInDate = "Check-in date is required";
    if (!formData.checkOutDate) {
      errs.checkOutDate = "Check-out date is required";
    } else if (new Date(formData.checkOutDate) <= new Date(formData.checkInDate)) {
      errs.checkOutDate = "Check-out must be after check-in";
    }

    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      const selectedRoom = rooms.find(r => r.id === formData.roomId);
      const updatedData: FormData = {
        ...formData,
        price: selectedRoom?.price.toString() || ''
      };

      sessionStorage.setItem("bookingData", JSON.stringify(updatedData));
      router.push("/register/booking/steptwo", "forward", "replace");
    } else {
      toast.error("Please fix the errors before continuing.");
    }
  };

  return (
    <IonPage>
      <FormHeader/>
     
        <BackFormContainer
          title="New Booking"
          subtitle="Step 1: Select room and dates"
          className="max-w-2xl"
        >
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
            <FormSelect
              label="Customer *"
              name="customer"
              value={
                formData.customerId != null
                  ? { value: formData.customerId, label: formData.customerName! }
                  : null
              }
              onChange={opt => setFormData(fd => ({
                ...fd,
                customerId: opt ? Number(opt.value) : null,
                customerName: opt ? opt.label : null
              }))}
              options={clients.map(client => ({
                value: client.id,
                label: client.name
              }))}
              placeholder="Select customer"
              error={errors.customer}
              required
            />

            <FormSelect
              label="Room *"
              name="roomId"
              value={
                formData.roomId != null
                  ? { value: formData.roomId, label: formData.roomLabel! }
                  : null
              }
              onChange={opt => setFormData(fd => ({
                ...fd,
                roomId: opt ? Number(opt.value) : null,
                roomLabel: opt ? opt.label : null,
                price: ''  // reset price on change
              }))}
              options={rooms.map(room => ({
                value: room.id,
                label: `Room ${room.id} (₦${room.price.toLocaleString()}/night)`
              }))}
              placeholder="Select room"
              error={errors.roomId}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormDatePicker
                label="Check-in Date *"
                value={formData.checkInDate}
                onChange={value => setFormData(fd => ({
                  ...fd,
                  checkInDate: value
                }))}
                minDate={today.toISOString().split("T")[0]}
                error={errors.checkInDate}
              />

              <FormDatePicker
                label="Check-out Date *"
                value={formData.checkOutDate}
                onChange={value => setFormData(fd => ({
                  ...fd,
                  checkOutDate: value
                }))}
                minDate={formData.checkInDate}
                error={errors.checkOutDate}
              />
            </div>

            <FormTextarea
              label="Special Instructions"
              name="bookingInstruction"
              value={formData.bookingInstruction}
              onChange={e => setFormData(fd => ({
                ...fd,
                bookingInstruction: e.target.value
              }))}
              placeholder="Any special requests or notes"
              rows={3}
            />

            <div className="pt-4">
              <Button text="Continue" type="submit" className="w-full" />
            </div>
          </form>
        </BackFormContainer>
     
    </IonPage>
  );
}
