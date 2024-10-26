export interface SimpleFormProps {
  formData: any;
}

const StepTwo = ({ formData }: SimpleFormProps) => {
  return (
    <div className="flex flex-col gap-4 bg-white h-fit  ">
      <p>Customer Name</p>
      <p>{formData.fullName}</p>

      <p>Address</p>

      <p>{formData.address}</p>

      <p>Phone</p>

      <p>{formData.phone}</p>

      <p>Note</p>
      <p>{formData.note}</p>
    </div>
  );
};

export default StepTwo;
