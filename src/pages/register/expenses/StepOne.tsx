import { useState } from "react";
import CustomSelect from "../../../components/select/Select";
import { FormProps } from "../customer/StepOne";
import InputBox from "../../../components/input/InputBox";

const StepOne = ({ formData, setFormData }: FormProps) => {
  const handleSelectChange = (name: string, option: any) => {
    setFormData({
      ...formData,
      [name]: {
        value: option?.value || null,
        label: option?.label || null,
      },
    });
  };

  const options = [
    { value: "fuel", label: "Fuel" },
    { value: "bill", label: "Bill" },
    { value: "other", label: "Other" },
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
      <>
        <p>Expenses Type</p>
        <CustomSelect
          name="expenseType"
          options={options}
          onChange={(option) => handleSelectChange("expenseType", option)}
          value={formData.expenseType?.value || null}
          placeholder="Select an expense type"
        />
      </>

      <>
        <p>Amount</p>
        <InputBox
          id="amount"
          name="amount"
          type="number"
          placeholder="Enter the amount"
          onChange={handleChange}
          value={formData.amount || ""}
          required
        />
      </>
      <>
        <p>Note</p>
        <textarea
          name="note"
          className="border rounded-md h-[100px] p-2"
          placeholder="Enter the message"
          onChange={handleChange}
        ></textarea>
      </>
    </div>
  );
};

export default StepOne;
