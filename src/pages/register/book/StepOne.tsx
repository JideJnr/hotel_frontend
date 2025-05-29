import { useState } from "react";
import CustomSelect from "../../../components/select/Select";
import { useDataContext } from "../../../context/dataContext";
import { FormProps } from "../customer/StepOne";
import dayjs from "dayjs";

const StepOne = ({ formData, setFormData }: FormProps) => {
  const { clients, room, user } = useDataContext();

  const handleSelectChange = (
    name: string,
    option: { value: string | number | null; label: string | null } | null,
  ) => {
    setFormData({
      ...formData,
      [name]: {
        value: option?.value || null,
        label: option?.label || null,
      },
    });
  };

  const typeOptions = [
    { value: "singleDay", label: "Single Day" },
    { value: "multipleDays", label: "Multiple Days" },
  ];

  const paymentOptions = [
    { value: "cash", label: "Cash" },
    { value: "transfer", label: "Transfer" },
    { value: "pos", label: "POS" },
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

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const formattedStartDate = startDate
    ? dayjs(startDate).format("YYYY-MM-DD")
    : "";
  const formattedEndDate = endDate ? dayjs(endDate).format("YYYY-MM-DD") : "";
  const isFormValid = formattedStartDate !== "" && formattedEndDate !== "";

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
        </>
      )}

      <p>Select Room</p>
      <CustomSelect
        name="roomNumber"
        options={room.map((room) => ({
          value: room.id,
          label: `Room ${room.id}`,
        }))}
        onChange={(option) => handleSelectChange("roomNumber", option)}
        value={formData.roomNumber?.value || null}
        placeholder="Select a room"
      />

      <p>Select Duration</p>
      <CustomSelect
        name="duration"
        options={typeOptions}
        onChange={(option) => handleSelectChange("duration", option)}
        value={formData.duration?.value || null}
        placeholder="Select the duration"
      />

      {formData.duration?.value === "singleDay" ||
      formData.duration?.value === "multipleDays" ? (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Date</p>
          <div className="flex items-center border rounded-sm min-h-[39px] p-2">
            <div className="input-group-text text-gray-500">
              <i className="ri-calendar-line"></i>
            </div>
          </div>
        </div>
      ) : null}

      <p>Note</p>
      <textarea
        name="bookingInstruction"
        className="border rounded-md h-[100px] p-2"
        placeholder="Enter a message"
        value={formData.bookingInstruction || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default StepOne;
