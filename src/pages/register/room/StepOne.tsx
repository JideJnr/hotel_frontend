import CustomSelect from "../../../components/select/Select";
import { useDataContext } from "../../../context/dataContext";
import { FormProps } from "../customer/StepOne";

const StepOne = ({ formData, setFormData }: FormProps) => {
  const { clients, room, user } = useDataContext();

  const handleSelectChange = (name: string, option: any) => {
    // Store both value and label in formData
    setFormData({
      ...formData,
      [name]: {
        value: option?.value || null,
        label: option?.label || null,
      },
    });
  };

  const type = [
    {
      value: "shortRest",
      label: "Short Rest",
    },
    {
      value: "lodge",
      label: "Lodge",
    },
  ];

  const payment = [
    {
      value: "cash",
      label: "Cash",
    },
    {
      value: "transfer",
      label: "Transfer",
    },
    {
      value: "pos",
      label: "POS",
    },
  ];

  const customerPayment = [
    {
      value: "inApp",
      label: "In App",
    },

    {
      value: "pos",
      label: "POS",
    },

    {
      value: "cash",
      label: "Cash",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const userRooms = room.filter((item) => item.location === user?.location);
  const activeRooms = userRooms.filter((item) => item.status === "available");
  console.log(clients);
  return (
    <div className="flex flex-col gap-4  h-full w-full p-4 ">
      {user && user.role !== "costumer" && (
        <div className="flex flex-col  gap-0">
          <p>Select Customer</p>
          <CustomSelect
            name="customer"
            options={clients.map((client) => ({
              value: client.id,
              label: client.name,
            }))}
            onChange={(option) => handleSelectChange("customer", option)}
            value={formData.customer?.value || null}
            placeholder="Select a member"
          />
        </div>
      )}

      <div className="flex flex-col  gap-0">
        <p>Select Room</p>
        <CustomSelect
          name="roomNumber"
          options={activeRooms.map((room) => ({
            value: room.id,
            label: `Room ${room.roomNumber}`,
          }))}
          onChange={(option) => handleSelectChange("roomNumber", option)}
          value={formData.roomNumber?.value || null}
          placeholder="Select a Room"
        />
      </div>
      <div className="flex flex-col gap-0">
        <p>Select Order Method</p>
        <CustomSelect
          name="orderMethod"
          options={type}
          onChange={(option) => handleSelectChange("orderMethod", option)}
          value={formData.orderMethod?.value || null}
          placeholder="Select Order Method"
        />
      </div>
      <div className="flex flex-col gap-0">
        <p>Select Payment Method</p>
        <CustomSelect
          name="paymentMethod"
          options={user && user.role === "customer" ? payment : customerPayment}
          onChange={(option) => handleSelectChange("paymentMethod", option)}
          value={formData.paymentMethod?.value || null}
          placeholder="Select a Payment Method"
        />
      </div>
      <div className="flex flex-col gap-0">
        <p>Note</p>
        <textarea
          name="bookingInstruction"
          className="border rounded-md h-[100px] p-2"
          placeholder="Enter the Message"
          value={formData.bookingInstruction || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default StepOne;
