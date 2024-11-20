import InputBox from "../../../components/input/InputBox";
import CustomSelect from "../../../components/select/Select";
import { useDataContext } from "../../../context/dataContext";
import { FormProps } from "../customer/StepOne";

const StepOne = ({ formData, setFormData }: FormProps) => {
  const handleSelectChange = (
    name: string,
    option: { value: string; label: string } | null,
  ) => {
    setFormData({
      ...formData,
      [name]: option ? { value: option.value, label: option.label } : null,
    });
  };

  const hotelOptions = [
    { value: "lagos", label: "Lagos" },
    { value: "ijebu", label: "Ijebu" },
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

  return (
    <div className="flex flex-col gap-4 bg-white h-fit p-4">
      <p>Select Hotel</p>
      <CustomSelect
        name="location"
        options={hotelOptions}
        onChange={(option) => handleSelectChange("location", option)}
        value={formData.location?.value || null}
        placeholder="Select the hotel"
      />

      <p>Room Number</p>
      <InputBox
        id="roomNumber"
        name="roomNumber"
        type="number"
        placeholder="Enter your room number"
        onChange={handleChange}
        value={formData.roomNumber || ""}
        required
      />

      <>
        <p>Short Rest Price</p>
        <InputBox
          id="shortRestPrice"
          name="shortRestPrice"
          type="number"
          placeholder="Enter the price"
          onChange={handleChange}
          value={formData.shortRestPrice || ""}
          required
        />
      </>

      <>
        <p>Lodge Price</p>
        <InputBox
          id="lodgePrice"
          name="lodgePrice"
          type="number"
          placeholder="Enter the price"
          onChange={handleChange}
          value={formData.lodgePrice || ""}
          required
        />
      </>
    </div>
  );
};

export default StepOne;
