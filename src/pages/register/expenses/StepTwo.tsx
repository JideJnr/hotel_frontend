import { SimpleFormProps } from "../customer/StepTwo";

const StepTwo = ({ formData }: SimpleFormProps) => {
  console.log(formData)
  return (
    <div className="flex flex-col gap-4 bg-white h-fit  ">
      <p>Expenses Type</p>
      <p>
        {formData.expenseType.label}
      </p>

      <p>Amount</p>

      <p>15000</p>

      

      <p>Note</p>
      <p>{formData.note}</p>
    </div>
  );
};

export default StepTwo;
