
import { useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/button/button";
import CustomSelect from "../../../../components/select/Select";

const BookingStepOne = () => {
  const router = useIonRouter();

  const [formData, setFormData] = useState({
    customer: null,
    roomNumber: null,
    bookingInstruction: '',
    paymentType: null,
    paymentMethod: null,
    partPaymentAmount: '',
    price: ''
  });

  const [errors, setErrors] = useState({});
  const [clients, setClients] = useState([]);
  const [room, setRoom] = useState([]);
  const [user, setUser] = useState({ role: "admin" }); // Mock user role

  useEffect(() => {
    // Simulate fetching clients and rooms
    setClients([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" }
    ]);
    setRoom([
      { id: 101 },
      { id: 102 }
    ]);
  }, []);

  const handleNext = () => {
    const newErrors: any = {};

    if (user.role !== "customer" && !formData.customer?.value) {
      newErrors.customer = "Customer is required.";
    }
    if (!formData.roomNumber?.value) {
      newErrors.roomNumber = "Room number is required.";
    }
    
      if (!formData.paymentType?.value) {
        toast.error("Please select a payment type.");
        return;
      }
      if (!formData.paymentMethod?.value) {
        toast.error("Please select a payment method.");
        return;
      }
      if (
        formData.paymentType?.value === "partPayment" &&
        !formData.partPaymentAmount
      ) {
        toast.error("Please enter amount for part payment.");
        return;
      }
  

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      sessionStorage.setItem("coreDetails", JSON.stringify(formData));
      router.push("/register/sales/steptwo", "forward", "replace");
    } else {
      toast.error("Please fix the errors before continuing.");
    }
  };

  const handleSelectChange = (
    name: string,
    option: { value: string | number | null; label: string | null } | null
  ) => {
    setFormData({
      ...formData,
      [name]: {
        value: option?.value || null,
        label: option?.label || null,
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    // Payment types and methods
    const type = [
      { value: "fullPayment", label: "Full Payment" },
      { value: "partPayment", label: "Part Payment" },
    ];
  
    const paymentOptions = [
      { value: "cash", label: "Cash" },
      { value: "transfer", label: "Bank Transfer" },
      { value: "pos", label: "POS" },
    ];

  return (
    
      <div className="flex flex-col gap-4 bg-white h-fit p-4">
        {user && user.role !== "customer" && (
          <>
            <p>Select Customer</p>
            <CustomSelect
              name="customer"
              options={clients.map((client) => ({
                value: client.id,
                label: client.name,
              }))}
              onChange={(option) => handleSelectChange("customer", option)}
              value={formData.customer?.value || null}
              placeholder="Select a customer"
            />
            {errors.customer && <span className="text-red-500 text-sm">{errors.customer}</span>}
          </>
        )}

        <p>Select Room</p>
        <CustomSelect
          name="roomNumber"
          options={room.map((r) => ({
            value: r.id,
            label: `Room ${r.id}`,
          }))}
          onChange={(option) => handleSelectChange("roomNumber", option)}
          value={formData.roomNumber?.value || null}
          placeholder="Select a room"
        />
     

        <p>Note</p>
        <textarea
          name="bookingInstruction"
          className="border rounded-md h-[100px] p-2"
          placeholder="Enter a message"
          value={formData.bookingInstruction || ""}
          onChange={handleChange}
        />

        <Button onClick={handleNext} text="Next" /> 
      </div>
    
  );
};

export default BookingStepOne;
