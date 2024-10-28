import React from "react";

export interface FormProps {
  formData?: any;
  setFormData: (updatedFormData: any) => void;
 
}



const StepOne = ({ formData, setFormData }: FormProps) => {
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
      <p>Full Name</p>
      <input
        type="text"
        name="fullName"
        id="full-name"
        autoComplete="given-name"
        value={formData.fullName}
        onChange={handleChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <p>Phone Number</p>
      <input
        type="number"
        name="phone"
        id="phone"
        value={formData.phone}
        onChange={handleChange}
        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        placeholder="8123456789"
      />

      <p>Address</p>
      <input
        type="text"
        name="address"
        id="street-address"
        autoComplete="street-address"
        value={formData.address}
        onChange={handleChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <p>Note</p>
      <textarea
        name="note"
        className="border rounded-md h-[100px] p-2"
        value={formData.note}
        onChange={handleChange}
        placeholder="Enter the Message"
      ></textarea>
    </div>
  );
};

export default StepOne;
