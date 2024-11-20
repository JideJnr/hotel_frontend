import { useEffect, useMemo, useState } from "react";
import { IonContent, IonIcon } from "@ionic/react";
import DashboardTile from "../../components/dashboardtiles/DashboardTiles";
import { formatNaira } from "../../function/formatNaira";
import { useDataContext } from "../../context/dataContext";
import Table, { Column } from "../../components/table/table";
import Room from "../register/room/Room";
import Expenses from "../register/expenses/Expenses";
import Customer from "../register/customer/Customer";
import Book from "../register/book/Book";
import { filterData } from "../../utils/filterData";
import RecordDetails from "./details/RecordDetails";
import Suspence from "../../components/suspense/Suspence";
import { toast } from "react-toastify";

export interface DataProps {
  formData?: any;
}

const Home = ({ formData }: DataProps) => {
  const { user, loading, error, record, expenses } = useDataContext();

  if (loading) return <p>loading...</p>;
  if (error) return toast.error("error loading page.");

  const [totalEarning, setTotalEarning] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  function displayPrice(amount: number): string {
    const formattedPrice = formatNaira(amount);
    return formattedPrice;
  }

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
          <p className="flex gap-1">
            Room
            <span>{value}</span>
          </p>
        ),
      },
      {
        Header: "",
        accessor: "status",

        Cell: ({ value }: { value: string }) => (
          <div
            className={`flex gap-x-1.5 h-fit w-fit mx-auto  rounded-full p-1 lg:px-2 bg-yellow-400/20`}
          >
            <p className="text-xs leading-5 text-gray-500 hidden lg:flex">
              <>{value}</>
            </p>

            <div className="h-full flex w-fit">
              <div
                className={`  h-1.5 w-1.5 rounded-full bg-yellow-400 flex  my-auto  `}
              ></div>
            </div>
          </div>
        ),
      },
    ],
    [],
  );

  const expensesColumns: Column[] = useMemo(
    () => [
      {
        Header: "Expenses",
        accessor: "expenseType",
      },
      {
        Header: "Amount",
        accessor: "price",

        Cell: ({ value }: { value: string }) => (
          <p className="text-xs leading-5 text-gray-500">
            <>{value}</>
          </p>
        ),
      },
    ],
    [],
  );

  const [roomModal, setRoomModal] = useState(false);
  const [bookModal, setBookModal] = useState(false);
  const [expensesModal, setExpensesModal] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [recordModal, setRecordModal] = useState(false);

  const filteredRecord =
    record && formData?.value ? filterData(record, formData.value) : record;

  const filteredExpenses =
    expenses && formData?.value
      ? filterData(expenses, formData.value)
      : expenses;

  useEffect(() => {
    const sum = filteredRecord.reduce((accumulator, item) => {
      return accumulator + item.price;
    }, 0);

    setTotalEarning(sum);
  }, [filteredRecord, user]);

  useEffect(() => {
    const sum = filteredExpenses.reduce((accumulator, item) => {
      return accumulator + item.price;
    }, 0);

    setTotalExpenses(sum);
  }, [filteredExpenses, user]);

  console.log(record);

  return (
    <IonContent>
      <div className="flex flex-col gap-12 px-4 py-8 bg-gray-100 w-full h-full">
        {roomModal && <Room setFormData={setRoomModal} />}
        {expensesModal && <Expenses setFormData={setExpensesModal} />}
        {customerModal && <Customer setFormData={setCustomerModal} />}
        {bookModal && <Book setFormData={setBookModal} />}
        {recordModal && (
          <RecordDetails formData={selectedData} setFormData={setRecordModal} />
        )}

        {!roomModal &&
          !expensesModal &&
          !customerModal &&
          !bookModal &&
          !recordModal && (
            <div className="flex flex-col gap-6">
              <div className="grid gap-4 lg:gap-8 md:grid-cols-3 w-full h-fit ">
                <DashboardTile
                  label="Revenue"
                  unit={displayPrice(totalEarning)}
                />
                <DashboardTile
                  label="Expenses"
                  unit={displayPrice(totalExpenses)}
                />
                <DashboardTile
                  label="Room Sold"
                  unit={filteredRecord?.length}
                />
              </div>

              {user && user?.role !== "admin" && (
                <div className="grid grid-cols-4 gap-2 w-full  ">
                  <div
                    className="flex flex-col gap-2"
                    onClick={() => {
                      setRoomModal(true);
                    }}
                  >
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-emerald-800 shadow-lg shadow-emerald-500/50 dark:shadow-lg dark:shadow-emerald-800/80 font-medium  text-sm p-2 rounded-full text-center w-12 h-12 mx-auto "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 flex mx-auto"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                        />
                      </svg>
                    </button>
                    <p className="mx-auto">Room</p>
                  </div>

                  <div
                    className="flex flex-col gap-2"
                    onClick={() => {
                      setExpensesModal(true);
                    }}
                  >
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-emerald-800 shadow-lg shadow-emerald-500/50 dark:shadow-lg dark:shadow-emerald-800/80 font-medium  text-sm p-2 rounded-full text-center w-12 h-12 mx-auto "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 flex mx-auto"s
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                        />
                      </svg>
                    </button>
                    <p className="mx-auto">Expenses</p>
                  </div>
                  <div
                    className="flex flex-col gap-2"
                    onClick={() => {
                      setCustomerModal(true);
                    }}
                  >
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-emerald-800 shadow-lg shadow-emerald-500/50 dark:shadow-lg dark:shadow-emerald-800/80 font-medium  text-sm p-2 rounded-full text-center w-12 h-12 mx-auto "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 flex mx-auto"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                        />
                      </svg>
                    </button>
                    <p className="mx-auto">Customer</p>
                  </div>
                  <div
                    className="flex flex-col gap-2"
                    onClick={() => {
                      setBookModal(true);
                    }}
                  >
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-emerald-800 shadow-lg shadow-emerald-500/50 dark:shadow-lg dark:shadow-emerald-800/80 font-medium  text-sm p-2 rounded-full text-center w-12 h-12 mx-auto "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 flex mx-auto"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                        />
                      </svg>
                    </button>
                    <p className="mx-auto">Book</p>
                  </div>
                </div>
              )}

              {filteredExpenses && filteredExpenses.length === 0 && (
                <div className="flex items-center gap-3 p-3  rounded-lg bg-white">
                  <IonIcon src="assets/svgs/announce.svg"></IonIcon>
                  <div className="overflow-hidden whitespace-nowrap flex-1">
                    <div className="animate-marquee">
                      <p className="text-sm font-medium text-dark">
                        {user?.role !== "admin" ? "You" : "Your team"} have not
                        registered any expense today
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Table
                  columns={columns}
                  data={filteredRecord}
                  onClick={(row) => {
                    setSelectedData(row);
                    setRecordModal(true);
                  }}
                />
              </div>
              <>
                {expenses && expenses.length > 0 && (
                  <div>
                    <Table columns={expensesColumns} data={expenses} />
                  </div>
                )}
              </>
            </div>
          )}
      </div>
    </IonContent>
  );
};

export default Home;
