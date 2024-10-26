import { useState } from "react";
import CustomSelect from "../../../components/select/Select";
import { FormProps } from "../customer/StepOne";

const StepOne = ({ formData, setFormData }: FormProps) => {
  const [selectedExpenseType, setSelectedExpenseType] = useState<
    string | number | null
  >(null); // State for Expense Type
  const [selectedAmount, setSelectedAmount] = useState<string | number | null>(
    null,
  ); // State for Amount
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

  const options = [
    {
      value: "fuel",
      label: "Fuel",
    },
    {
      value: "bill",
      label: "Bill",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

  const amount = [
    {
      value: 1000,
      label: "1k",
    },
    {
      value: 2000,
      label: "2k",
    },
    {
      value: 3000,
      label: "3k",
    },
    {
      value: 4000,
      label: "4k",
    },
    {
      value: 5000,
      label: "5k",
    },
    {
      value: 6000,
      label: "6k",
    },
    {
      value: 7000,
      label: "7k",
    },
    {
      value: 8000,
      label: "8k",
    },
    {
      value: 9000,
      label: "9k",
    },
    {
      value: 10000,
      label: "10k",
    },
    {
      value: "other",
      label: "More",
    },
  ];

  return (
    <div className="flex flex-col gap-4 bg-white h-fit p-4">
      <p>Expenses Type</p>

      <CustomSelect
        name="expenseType"
        options={options}
        onChange={(option) => handleSelectChange("expenseType", option)}
        value={formData.customer?.value || null}
        placeholder="Select an expense type"
      />

      <p>Amount</p>

      <CustomSelect
        name="amount"
        options={amount}
        onChange={(option) => handleSelectChange("amount", option)}
        value={formData.amount?.value || null}
        placeholder="Select the amount"
      />
      {formData.amount && formData.amount.value === "others" && (
        <>
          <p>Note</p>
          <textarea
            name="booking-instruction"
            className="border rounded-md h-[100px] p-2"
            placeholder="Enter the message"
          ></textarea>
        </>
      )}
      <p>Note</p>
      <textarea
        name="booking-instruction"
        className="border rounded-md h-[100px] p-2"
        placeholder="Enter the message"
      ></textarea>
    </div>
  );
};

export default StepOne;
