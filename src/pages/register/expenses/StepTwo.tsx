import { FormProps } from "../customer/StepOne";
import { SimpleFormProps } from "../customer/StepTwo";

const StepTwo = ({ formData }: SimpleFormProps) => {
  return (
    <div className="flex flex-col gap-4 bg-white h-fit  ">
      <p>Select Member2</p>

      <p>Select Room</p>

      <p>Select Order Method</p>

      <p>Select Payment Method</p>

      <p>Note</p>
    </div>
  );
};

export default StepTwo;
