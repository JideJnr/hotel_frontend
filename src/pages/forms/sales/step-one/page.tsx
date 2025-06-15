import OnboardingTemplate from "../../../../components/templates/onboarding/onboarding"
import { IonLabel, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TextInput from "../../../../components/input/text/input";
import Button from "../../../../components/button/button";
import CustomSelect from "../../../../components/select/Select";

type Option = {
  value: string | number | null;
  label: string | null;
};

type FormData = {
  customer: Option | null;
  roomNumber: Option | null;
  bookingInstruction: string;
};

type Errors = {
  customer?: string;
  roomNumber?: string;
};

type Client = {
  id: number;
  name: string;
};

type Room = {
  id: number;
  // Add more room properties as needed
  // floor?: number;
  // type?: string;
};

type User = {
  role: string;
  // Add more user properties as needed
};

const SalesStepOne = () => {
  const router = useIonRouter();

  const [formData, setFormData] = useState<FormData>({
    customer: null,
    roomNumber: null,
    bookingInstruction: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [clients, setClients] = useState<Client[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [user, setUser] = useState<User>({ role: "admin" });

  useEffect(() => {
    // Simulate API calls for clients and rooms
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        setClients([
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" }
        ]);
        setRooms([
          { id: 101 },
          { id: 102 }
        ]);
      } catch (error) {
        toast.error("Failed to load data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    const newErrors: Errors = {};

    if (user.role !== "customer" && !formData.customer?.value) {
      newErrors.customer = "Customer is required.";
    }
    if (!formData.roomNumber?.value) {
      newErrors.roomNumber = "Room number is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      sessionStorage.setItem("coreDetails", JSON.stringify(formData));
      router.push("/register/sales/steptwo", "forward", "replace");
    } else {
      toast.error("Please fix the errors before continuing.");
    }
  };

  const handleSelectChange = (name: keyof FormData, option: Option | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: option,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <OnboardingTemplate titleOne="Complete your profile">
      <div className="flex flex-col gap-4 bg-white h-fit p-4">
        {user.role !== "customer" && (
          <>
            <p className="text-sm font-medium text-gray-700">Select Customer</p>
            <CustomSelect
              name="customer"
              options={clients.map(client => ({
                value: client.id,
                label: client.name,
              }))}
              onChange={(option) => handleSelectChange("customer", option)}
              value={formData.customer}
              placeholder="Select a customer"
              isInvalid={!!errors.customer}
            />
            {errors.customer && (
              <span className="text-red-500 text-sm">{errors.customer}</span>
            )}
          </>
        )}

        <p className="text-sm font-medium text-gray-700">Select Room</p>
        <CustomSelect
          name="roomNumber"
          options={rooms.map(room => ({
            value: room.id,
            label: `Room ${room.id}`,
          }))}
          onChange={(option) => handleSelectChange("roomNumber", option)}
          value={formData.roomNumber}
          placeholder="Select a room"
          isInvalid={!!errors.roomNumber}
        />
        {errors.roomNumber && (
          <span className="text-red-500 text-sm">{errors.roomNumber}</span>
        )}

        <p className="text-sm font-medium text-gray-700">Note</p>
        <textarea
          name="bookingInstruction"
          className="border rounded-md h-[100px] p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter any special instructions"
          value={formData.bookingInstruction}
          onChange={handleChange}
        />

        <Button onClick={handleNext} text="Next" className="mt-4" />
      </div>
    </OnboardingTemplate>
  );
};

export default SalesStepOne;