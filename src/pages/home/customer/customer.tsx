import { useState } from "react";
import { IonContent, IonIcon } from "@ionic/react";
import DashboardTile from "../../../components/dashboardtiles/DashboardTiles";
import { formatNaira } from "../../../function/formatNaira";
import { useDataContext } from "../../../context/dataContext";
import Room from "../../register/room/Room";
import Expenses from "../../register/expenses/Expenses";
import Customer from "../../register/customer/Customer";
import Book from "../../register/book/Book";

import RecordDetails from "../details/RecordDetails";

export interface DataProps {
  formData?: any;
}

const Home = ({ formData }: DataProps) => {
  const { user, loading, error } = useDataContext();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const [roomModal, setRoomModal] = useState(false);
  const [bookModal, setBookModal] = useState(false);
  const [expensesModal, setExpensesModal] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [recordModal, setRecordModal] = useState(false);

  function displayPrice(amount: number): string {
    const formattedPrice = formatNaira(amount);
    return formattedPrice;
  }


  console.log(user)
  return (
    <IonContent>
      <div className="flex flex-col gap-6 px-4 py-8">
        {roomModal && <Room setFormData={setRoomModal} />}
        {expensesModal && <Expenses setFormData={setExpensesModal} />}
        {customerModal && <Customer setFormData={setCustomerModal} />}
        {bookModal && <Book setFormData={setBookModal} />}
        {recordModal && (
          <RecordDetails formData={selectedData} setFormData={setRecordModal} />
        )}

        {!roomModal && !bookModal && !recordModal && (
          <>
            <div className="grid gap-4 lg:gap-8 md:grid-cols-3 w-full h-fit ">
              <DashboardTile label="Balance" unit={displayPrice(20000)} />

              <DashboardTile label="Active Room" unit={2} />
            </div>
            <div className="grid grid-cols-2 gap-2 w-full  ">
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
                  setBookModal(true);
                }}
              >
                <IonIcon
                  src="assets/svgs/user-plus.svg"
                  className="border border-green-400 p-4 bg-[#ebe8fe] rounded-full text-[24px] text-green-400"
                ></IonIcon>
                <span className="text-[12px] font-medium leading-[20px] tracking-[-0.13px]">
                  Book
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </IonContent>
  );
};

export default Home;
