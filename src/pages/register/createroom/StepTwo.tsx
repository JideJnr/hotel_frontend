import { useEffect } from "react";
import { useDataContext } from "../../../context/dataContext";
import { FormProps } from "../customer/StepOne";

const StepTwo = ({ formData, setFormData }: FormProps) => {
  const { room } = useDataContext();
  console.log(formData);
  return (
    <div className="flex flex-col gap-4 bg-white h-fit">
      <p>Hotel</p>
      <p>{formData.location?.label || "- "}</p>{" "}
      {/* Optional chaining to prevent errors */}
      <p>Room Number</p>
      <p>{formData.roomNumber || "- "}</p>
      <p>Shortrest price</p>
      <p>{formData.shortRestPrice || "- "}</p>
      <p>Lodge price</p>
      <p>{formData.lodgePrice || "- "}</p>
    </div>
  );
};

export default StepTwo;
