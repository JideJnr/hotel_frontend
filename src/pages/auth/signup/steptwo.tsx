import { IonLabel } from "@ionic/react";
import { FormProps } from "../../register/customer/StepOne";
import TextInput from "../../../components/input/authInput";
import CustomSelect from "../../../components/select/Select";

const StepTwo = ({ formData, setFormData }: FormProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const hotelOptions = [
    { value: "lagos", label: "Lagos" },
    { value: "ijebu", label: "Ijebu" },
  ];

  const handleSelectChange = (
    name: string,
    option: { value: string; label: string } | null,
  ) => {
    setFormData({
      ...formData,
      [name]: option ? { value: option.value, label: option.label } : null,
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <IonLabel>FullName</IonLabel>
        <TextInput
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter FullName"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <IonLabel> Phone number</IonLabel>
        <TextInput
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <IonLabel>Address</IonLabel>
        <TextInput
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <IonLabel>Location</IonLabel>
        <CustomSelect
          name="location"
          options={hotelOptions}
          onChange={(option) => handleSelectChange("location", option)}
          value={formData.location?.value || null}
          placeholder="Select the location"
        />
      </div>
    </div>
  );
};

export default StepTwo;
