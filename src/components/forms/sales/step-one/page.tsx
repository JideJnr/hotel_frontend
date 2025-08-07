// pages/sales/SalesStepOne.tsx
import { IonPage, useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FormHeader,
  BackFormContainer,
  Option,
  FormTextarea
} from "../../../../components/forms";
import Button from "../../../../components/button/button";
import FormSelect from "../../FormSelect";
import { useCustomer } from "../../../../contexts/data/CustomerContext";




type Errors = {
  customer?: string;
  roomNumber?: string;
};

type Client = { id: number; name: string; };
type Room   = { id: number; };

export default function SalesStepOne() {
  const router = useIonRouter();

  const { fetchCustomers , customers } = useCustomer();
  const [formData, setFormData] = useState<SalesData>({
    customerId: null,
    customerName: null,
    requestId: null,
    requestLabel: null,
    roomNumberId: null,
    roomNumberLabel: null,
    paymentMethodId: null,
    paymentMethodLabel: null,
    bookingInstruction: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [clients, setClients] = useState<Client[]>([]);
  const [rooms, setRooms]     = useState<Room[]>([]);
  const paymentOptions: Option[] = [
    { value: "cash",     label: "Cash"     },
    { value: "card",     label: "Card"     },
    { value: "transfer", label: "Transfer" },
  ];

  const requestOption: Option[] = [
    { value: "oneHour",     label: "Short Rest (One Hour)"     },
    { value: "twoHours",     label: "Short Rest (Two Hours)"     },
    { value: "lodge", label: "Lodge" },
  ];

  useEffect(() => {
    fetchCustomers() 
    setRooms([
      { id: 101 }, { id: 102 }
    ]);
  }, []);

  const handleNext = () => {
    const errs: Errors = {};
    if (!formData.customerId)   errs.customer = "Customer is required.";
    if (!formData.roomNumberId) errs.roomNumber = "Room number is required.";

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // now sessionStorage has flat ids+labels
      sessionStorage.setItem("bookingData", JSON.stringify(formData));
      router.push("/sales/steptwo", "forward", "replace");
    } else {
      toast.error("Please fix the errors before continuing.");
    }
  };

  return (
    <IonPage>
      <FormHeader/>
      <BackFormContainer
        title="New Booking"
        subtitle="Step 1: Enter booking details"
        className="max-w-2xl"
      >
        <form onSubmit={e => { e.preventDefault(); handleNext(); }} className="space-y-6">
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
    customerId: opt ? opt.value : null,
    customerName: opt ? opt.label : null
  }))}
  options={customers.map(c => ({ value: c.id, label: c.fullName }))}
  placeholder="Select a customer"
  error={errors.customer}
  required
/>


          <FormSelect
            label="Room *"
            name="roomNumber"
            value={
              formData.roomNumberId != null
                ? { value: formData.roomNumberId, label: formData.roomNumberLabel! }
                : null
            }
            onChange={opt => setFormData(fd => ({
              ...fd,
              roomNumberId: opt ? Number(opt.value) : null,
              roomNumberLabel: opt ? opt.label : null
            }))}
            options={rooms.map(r => ({
              value: r.id,
              label: `Room ${r.id}`
            }))}
            placeholder="Select a room"
            error={errors.roomNumber}
            required
          />

          
          <FormSelect
            label="Request Type"
            name="requestType"
            value={
              formData.paymentMethodId != null
                ? { value: formData.requestId, label: formData.requestLabel }
                : null
            }
            onChange={opt => setFormData(fd => ({
              ...fd,
              requestId: opt ? String(opt.value) : null,
              requestLabel: opt ? opt.label : null
            }))}
            options={requestOption}
            placeholder="Select request type"
          />

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


          <FormTextarea
            label="Booking Note"
            name="bookingInstruction"
            value={formData.bookingInstruction}
            onChange={e => setFormData(fd => ({
              ...fd,
              bookingInstruction: e.target.value
            }))}
            placeholder="Any special instructions?"
            rows={3}
          />

          <div className="pt-4">
            <Button text="Next" type="submit" className="w-full"/>
          </div>
        </form>
      </BackFormContainer>
    </IonPage>
  );
}
