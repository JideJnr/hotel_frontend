import React, { useEffect, useMemo, useState } from "react";
import Header from "../../components/layout/header/Header";
import CustomSelect from "../../components/select/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../components/button/button";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Table, { Column } from "../../components/table/table";
import { fetchData } from "../../utils/firebaseUtils";
import { db } from "../../../firebase";
import DashboardTile from "../../components/dashboardtiles/DashboardTiles";
import { formatNaira } from "../../function/formatNaira";
import { useDataContext } from "../../context/dataContext";

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
    record: null,
    dateRange: [null, null],
  });

  const handleSelectChange = (name: string, option: any) => {
    setFormData({
      ...formData,
      [name]: option ? { value: option.value, label: option.label } : null,
    });
  };

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    setFormData((prevData) => ({
      ...prevData,
      dateRange: dates,
    }));
  };

  const columns: Column[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "customerName",
        Cell: ({ value }: { value: string }) => (
          <div className="flex gap-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Passport"
              style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            />
            <p>{value}</p>
          </div>
        ),
      },
      {
        Header: "Room",
        accessor: "room",
        Cell: ({ value }: { value: string }) => (
          <p className="flex gap-4">
            Room
            <span>{value}</span>
          </p>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }: { value: string }) => (
          <div className="flex gap-x-1.5 h-fit w-fit mx-auto rounded-full p-1 lg:px-2 bg-yellow-400/20">
            <p className="text-xs leading-5 text-gray-500 hidden lg:flex">
              {value}
            </p>
            <div className="h-1.5 w-1.5 rounded-full bg-yellow-400"></div>
          </div>
        ),
      },
    ],
    [],
  );

  const expensesColumns: Column[] = useMemo(
    () => [
      /* Similar to columns but for expenses */
    ],
    [],
  );

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [totalEarning, setTotalEarning] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  function displayPrice(amount: number): string {
    const formattedPrice = formatNaira(amount);
    return formattedPrice;
  }

  const { user } = useDataContext();
  return (
    <Header backAction={true}>
      <div className="mx-auto w-full divide-y">
        {user?.email}
        <Disclosure as="div" className="p-4" defaultOpen={true}>
          {({ open }) => (
            <>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <p>Filter Options</p>
                <ChevronDownIcon
                  className={`size-5 fill-black transform transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </DisclosureButton>

              <DisclosurePanel className="mt-2 text-sm/5 text-black w-full">
                <div className="flex flex-col gap-4 h-fit">
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
                  <p>Record</p>
                  <CustomSelect
                    name="record"
                    options={recordOptions}
                    onChange={(option) => handleSelectChange("record", option)}
                    value={formData.record?.value}
                    placeholder="Select the record"
                    disabled={loading}
                  />
                  <Button
                    text="Generate"
                    loading={loading}
                    loadingText="Generating"
                  />
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>

      <div className="mt-4">
        <>
          {data !== null && (
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 lg:gap-8 md:grid-cols-3 w-full h-fit ">
                <DashboardTile
                  label="Revenue"
                  unit={displayPrice(totalEarning)}
                />

                <DashboardTile
                  label="Expenses"
                  unit={displayPrice(totalExpenses)}
                />
              </div>
              <Table
                columns={
                  formData.record?.value === "expenses"
                    ? expensesColumns
                    : columns
                }
                data={data}
              />
            </div>
          )}
        </>
      </div>
    </Header>
  );
};

export default Analytics;
