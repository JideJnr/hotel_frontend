// pages/sales/SalesStepOne.tsx
import { IonPage, useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FormHeader,
  BackFormContainer,

  FormTextarea
} from "../../../../components/forms";
import Button from "../../../../components/button/button";
import FormSelect from "../../FormSelect";
import { useCustomer } from "../../../../contexts/data/CustomerContext";
import { useRoom } from "../../../../contexts/data/RoomContext";
import { paymentOptions , requestOption } from "../../../../utils/enum";
import { useRecord } from "../../../../contexts/data/RecordContext";
import { useParams } from "react-router";
import Footer from "../../../footer/footer";

type Errors = {
  customer?: string;
  roomNumber?: string;
};

export default function SalesStepOne() {
  const router = useIonRouter();
  const { id } = useParams<{ id: string }>();
  
  const { fetchRecord , record } = useRecord();
  const { fetchCustomers , customers } = useCustomer();
  const { fetchAvailableRooms , availableRooms } = useRoom();
  
  useEffect(() => {
    fetchRecord(id)
  }, [id]);
  
  const [formData, setFormData] = useState<SalesData>({
    customerId: null,
    customerName: record?.customerName || null,
    requestId: null,
    requestLabel: null,
    roomName: record?.roomName || null,
    roomId: null,
    paymentMethodId: null,
    paymentMethodLabel: record?.paymentMethodLabel ||  null,
    bookingInstruction: record?.bookingInstruction ||"",
  });

  const [errors, setErrors] = useState<Errors>({});



  useEffect(() => {
    fetchCustomers();
    fetchAvailableRooms();
  }, []);

  const handleNext = () => {
    const errs: Errors = {};
    if (!formData.customerId)   errs.customer = "Customer is required.";
    if (!formData.roomId) errs.roomNumber = "Room number is required.";

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
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
        title="New Sales"
        subtitle="Step 1: Enter Sales details"
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
              customerId: opt ? String(opt.value) : null,
              customerName: opt ? opt.label : null
            }))}
            options={customers.map(c => ({ value: c.id, label: c.userName }))}
            placeholder="Select a customer"
            error={errors.customer}
            required
          />


          <FormSelect
            label="Room *"
            name="roomNumber"
            value={
              formData.roomId != null
                ? { value: formData.roomId, label: formData.roomName! }
                : null
            }
            onChange={opt => setFormData(fd => ({
              ...fd,
              roomId: opt ? String(opt.value) : null,
              roomName: opt ? opt.label : null
            }))}
            options={availableRooms.map(r => ({
              value: r.id,
              label: `Room ${r.name}`
            }))}
            placeholder="Select a room"
            error={errors.roomNumber}
            required
          />

          
          <FormSelect
            label="Request Type"
            name="requestType"
            value={
              formData.requestId != null
                ? { value: formData.requestId, label: formData.requestLabel! }
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
            value={formData.bookingInstruction|| ''}
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
        <Footer/>
      </BackFormContainer>
    </IonPage>
  );
}
