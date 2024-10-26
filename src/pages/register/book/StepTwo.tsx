import { useEffect } from "react";
import { useDataContext } from "../../../context/dataContext";
import { FormProps } from "../customer/StepOne";
import CustomSelect from "../../../components/select/Select";

const StepTwo = ({ formData, setFormData }: FormProps) => {
  const { room: rooms } = useDataContext();

  useEffect(() => {
    if (formData.roomNumber && formData.orderMethod) {
      const room = rooms.find(
        (room) => room.roomNumber === formData.roomNumber.value,
      );

      if (room) {
        let price = 0;
        if (formData.orderMethod.value === "shortRest") {
          price = room.shortRest;
        } else if (formData.orderMethod.value === "lodge") {
          price = room.lodge;
        }

        setFormData({
          ...formData,
          price: price,
        });
        console.log(price);
      }
    }
  }, [formData.roomNumber, formData.orderMethod]);

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

  const type = [
    {
      value: "fullPayment",
      label: "Full Payment",
    },
    {
      value: "partPayment",
      label: "Part Partment",
    },
  ];
  return (
    <div className="flex flex-col gap-4 bg-white h-fit">
      <p>price</p>
      <p>{formData.price || "- "}</p>
      <p>Select Payment Type</p>
      <CustomSelect
        name="paymentType"
        options={type}
        onChange={(option) => handleSelectChange("paymentType", option)}
        value={formData.paymentType?.value || null}
        placeholder="Select Payment Type"
      />

      {formData.paymentType.value === "partPayment" && (
        <>
          <p>Amount</p>

          <textarea
            name="booking-instruction"
            className="border rounded-md h-[100px] p-2"
            placeholder="Enter the message"
          ></textarea>
        </>
      )}
    </div>
  );
};

export default StepTwo;
