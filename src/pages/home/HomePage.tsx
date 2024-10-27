import { useContext, useEffect, useMemo, useState } from "react";
import { IonContent, IonIcon } from "@ionic/react";
import "../../style.css";
import DashboardTile from "../../components/dashboardtiles/DashboardTiles";
import { formatNaira } from "../../function/formatNaira";
import { useDataContext } from "../../context/dataContext";
import Table, { Column } from "../../components/table/table";
import Room from "../register/room/Room";
import Expenses from "../register/expenses/Expenses";
import Customer from "../register/customer/Customer";
import Book from "../register/book/Book";
import RoomDetails from "../details/RoomDetails";

interface FormProps {
  formData?: any;
}

const Home = ({ formData }: FormProps) => {
  const { user, loading, error, record, expenses } = useDataContext();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const [totalEarning, setTotalEarning] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  useEffect(() => {
    const sum = record.reduce((accumulator, item) => {
      return accumulator + item.price;
    }, 0);

    setTotalEarning(sum);
  }, [record, user]);

  useEffect(() => {
    const sum = expenses.reduce((accumulator, item) => {
      return accumulator + item.amount;
    }, 0);

    setTotalExpenses(sum);
  }, [expenses, user]);

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
          <p className="flex gap-4">
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
            className={`flex gap-x-1.5 h-fit w-fit mx-auto rounded-full p-1 lg:px-2 bg-yellow-400/20`}
          >
            <p className="text-xs leading-5 text-gray-500 hidden lg:flex">
              <>{value}</>
            </p>

            <div
              className={`  h-1.5 w-1.5 rounded-full bg-yellow-400 flex  `}
            ></div>
          </div>
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

  return (
    <IonContent>
      <div className="flex flex-col gap-6 px-4 py-8">
        {roomModal && <Room setFormData={setRoomModal} />}
        {expensesModal && <Expenses setFormData={setExpensesModal} />}
        {customerModal && <Customer setFormData={setCustomerModal} />}
        {bookModal && <Book setFormData={setBookModal} />}
        {recordModal && (
          <RoomDetails formData={selectedData} setFormData={setRecordModal} />
        )}

        {!roomModal &&
          !expensesModal &&
          !customerModal &&
          !bookModal &&
          !recordModal && (
            <>
              <div className="grid gap-4 lg:gap-8 md:grid-cols-3 w-full h-fit ">
                <DashboardTile
                  label="Revenue"
                  unit={displayPrice(totalEarning)}
                />
                <DashboardTile
                  label="Expenses"
                  unit={displayPrice(totalExpenses)}
                />
                <DashboardTile label="Room Sold" unit={record.length} />
              </div>

              {user && user.role !== "admin" && (
                <div className="grid grid-cols-4 gap-2 w-full ">
                  <div
                    className="flex flex-col items-center justify-center gap-1.5 text-center"
                    onClick={() => {
                      setRoomModal(true);
                    }}
                  >
                    <IonIcon
                      src="assets/svgs/users.svg"
                      className="border border-primary p-4 bg-[#ebe8fe] rounded-full text-[24px] text-primary"
                    ></IonIcon>
                    <span className="text-[12px] font-medium leading-[20px] tracking-[-0.13px]">
                      Room
                    </span>
                  </div>

                  <div
                    className="flex flex-col items-center justify-center gap-1.5 text-center"
                    onClick={() => {
                      setExpensesModal(true);
                    }}
                  >
                    <IonIcon
                      src="assets/svgs/users.svg"
                      className="border border-primary p-4 bg-[#ebe8fe] rounded-full text-[24px] text-primary"
                    ></IonIcon>

                    <span className="text-[12px] text-black font-medium leading-[20px] tracking-[-0.13px]">
                      Expenses
                    </span>
                  </div>

                  <div
                    className="flex flex-col items-center justify-center gap-1.5 text-center"
                    onClick={() => {
                      setCustomerModal(true);
                    }}
                  >
                    <IonIcon
                      src="assets/svgs/credit-card.svg"
                      className="border border-primary p-4 bg-[#ebe8fe] rounded-full text-[24px] text-primary"
                    ></IonIcon>
                    <span className="text-[12px] font-medium leading-[20px] tracking-[-0.13px]">
                      Client
                    </span>
                  </div>

                  <div
                    className="flex flex-col items-center justify-center gap-1.5 text-center"
                    onClick={() => {
                      setBookModal(true);
                    }}
                  >
                    <IonIcon
                      src="assets/svgs/user-plus.svg"
                      className="border border-primary p-4 bg-[#ebe8fe] rounded-full text-[24px] text-primary"
                    ></IonIcon>
                    <span className="text-[12px] font-medium leading-[20px] tracking-[-0.13px]">
                      Book
                    </span>
                  </div>
                </div>
              )}

              {expenses && expenses.length === 0 && (
                <div className="flex items-center gap-3 p-3  rounded-lg bg-[#f4f5f8]">
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
                  data={record}
                  onClick={(row) => {
                    setSelectedData(row);
                    setRecordModal(true);
                  }}
                />
              </div>
              <>
                {expenses && expenses.length > 0 && (
                  <div>
                    <Table columns={columns} data={record} />
                  </div>
                )}
              </>
            </>
          )}
      </div>
    </IonContent>
  );
};

export default Home;
