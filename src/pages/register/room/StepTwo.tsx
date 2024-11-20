import { useEffect } from "react";
import { useDataContext } from "../../../context/dataContext";
import { FormProps } from "../customer/StepOne";

const StepTwo = ({ formData, setFormData }: FormProps) => {
  const { room: rooms } = useDataContext();
  console.log(rooms);
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
  console.log(formData);

  return (
    <div className="flex flex-col gap-4 bg-white h-fit p-4">
      <>
        <p>Customer</p>
        <p>{formData.customer?.label || "- "}</p>{" "}
      </>
      <>
        <p>Room</p>
        <p>{formData.roomNumber?.label || "- "}</p>
      </>
      <>
        <p>Order Type</p>
        <p>{formData.orderMethod?.label || "- "}</p>
      </>
      <>
        <p>Select Payment Method</p>
        <p>{formData.paymentMethod?.label || "- "}</p>
      </>
      <>
        <p>price</p>
        <p>{formData.price || "- "}</p>
      </>
      <>
        <p>Note</p>
        <p>{formData.bookingInstruction || "- "}</p>{" "}
      </>
    </div>
  );
};

export default StepTwo;
