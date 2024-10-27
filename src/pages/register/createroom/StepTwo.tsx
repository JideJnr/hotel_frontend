import { useEffect } from "react";
import { useDataContext } from "../../../context/dataContext";
import { FormProps } from "../customer/StepOne";

const StepTwo = ({ formData, setFormData }: FormProps) => {
  const { room } = useDataContext();
  console.log(room)

  return (

    <div className="flex flex-col gap-4 bg-white h-fit">
      <p>Hotel</p>
      <p>{formData.hotel?.label || "- "}</p>{" "}
      {/* Optional chaining to prevent errors */}
      <p>Room Number</p>
      <p>{formData.roomNumber || "- "}</p>
      <p>price</p>
      <p>{formData.price || "- "}</p>
    
    </div>
  );
};

export default StepTwo;
