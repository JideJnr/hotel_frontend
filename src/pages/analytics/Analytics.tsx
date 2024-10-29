import React, { useState } from "react";
import Header from "../../components/layout/Header";
import CustomSelect from "../../components/select/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../components/button/button";

const Analytics: React.FC = () => {
  const recordOptions = [
    { value: "all", label: "All" },
    { value: "room", label: "Room" },
    { value: "expenses", label: "Expenses" },
  ];

  const [formData, setFormData] = useState<{
    record: { value: string; label: string } | null;
    dateRange: [Date | null, Date | null];
  }>({
    record: null, // Initialize record as null
    dateRange: [null, null], // Initialize start and end date as null
  });

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

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    setFormData((prevData) => ({
      ...prevData,
      dateRange: dates,
    }));
  };

  return (
    <Header>
      <div className="flex flex-col gap-4 bg-white h-fit p-4">
        <p>Select Date Range</p>
        <DatePicker
          selected={formData.dateRange[0]}
          onChange={handleDateRangeChange}
          startDate={formData.dateRange[0] || undefined}
          endDate={formData.dateRange[1] || undefined}
          selectsRange
          isClearable
          placeholderText="Select Date Range"
          className="border rounded p-2 w-full"
        />
        <p>Selected Dates:</p>
        <p>
          {formData.dateRange[0]
            ? formData.dateRange[0].toDateString()
            : "Start Date"}{" "}
          -
          {formData.dateRange[1]
            ? formData.dateRange[1].toDateString()
            : "End Date"}
        </p>

        <p>Record</p>

        <CustomSelect
          name="record"
          options={recordOptions}
          onChange={(option) => handleSelectChange("record", option)}
          value={formData.record?.value || null}
          placeholder="Select the record"
        />

        <Button text="Generate" />
      </div>
    </Header>
  );
};

export default Analytics;
