import {
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  useIonRouter,
} from "@ionic/react";
import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import ScheduleCard from "../../../components/templates/card/ScheduleCard";
import { useRecord } from "../../../contexts/data/RecordContext";
import { useEffect, useState } from "react";
import { useExpenses } from "../../../contexts/data/ExpensesContext";
import { useComputation } from "../../../contexts/data/ComputationContext";
import Footer from "../../../components/footer/footer";
import { formatNaira } from "../../../utils/formatNaira";
import DateHeader from "../../../components/table/DateHeader";
import FloatingMenu from "../../../components/table/FloatingMenu";
import dayjs from "dayjs";
import { getHotelBusinessDate } from "../../../utils/utilities";
import LoadingPage from "../../../components/loading/Loading";
import { chevronBack, chevronForward } from "ionicons/icons";
import EmptyState from "../../../components/empty/empty";

const Home = () => {
  const router = useIonRouter();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { fetchRecords, records, loading: recordLoading } = useRecord();
  const { fetchExpensesOnDate, expenses, loading: expenseLoading } =
    useExpenses();
  const {
    fetchBalanceOnDate,
    fetchNewCustomersOnDateCount,
    newCustomerCount,
    balance,
    totalSales,
    totalExpenses,
    recordCount: salesCount,
    expensesCount,
    loading: computationLoading,
  } = useComputation();

  const [currentDate, setCurrentDate] = useState(dayjs(getHotelBusinessDate()));

  // Record pagination state
  const [recordCurrentPage, setRecordCurrentPage] = useState(1);
  const [recordTotalPages, setRecordTotalPages] = useState(1);
  const [recordHasNextPage, setRecordHasNextPage] = useState(false);
  const [recordHasPrevPage, setRecordHasPrevPage] = useState(false);

  // Expenses pagination state
  const [expensesCurrentPage, setExpensesCurrentPage] = useState(1);
  const [expensesTotalPages, setExpensesTotalPages] = useState(1);
  const [expensesHasNextPage, setExpensesHasNextPage] = useState(false);
  const [expensesHasPrevPage, setExpensesHasPrevPage] = useState(false);

  const loading = recordLoading || expenseLoading || computationLoading;

  // Fetch records
  useEffect(() => {
    const loadRecords = async () => {
      try {
        const formattedDate = currentDate.format("YYYY-MM-DD");
        const response = await fetchRecords(formattedDate, recordCurrentPage, 5);
        if (response?.data) {
          setRecordTotalPages(response.data.totalPages);
          setRecordHasNextPage(response.data.hasNextPage);
          setRecordHasPrevPage(response.data.hasPrevPage);
        }
      } catch (err) {
        console.error("Records load error:", err);
      }
    };
    loadRecords();
  }, [currentDate, recordCurrentPage]);

  // Fetch expenses
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const formattedDate = currentDate.format("YYYY-MM-DD");
        const response = await fetchExpensesOnDate(
          formattedDate,
          expensesCurrentPage,
          5
        );
        if (response?.data) {
          setExpensesTotalPages(response.data.totalPages);
          setExpensesHasNextPage(response.data.hasNextPage);
          setExpensesHasPrevPage(response.data.hasPrevPage);
        }
      } catch (err) {
        console.error("Expenses load error:", err);
      }
    };
    loadExpenses();
  }, [currentDate, expensesCurrentPage]);

  // Fetch computations (balance, new customers)
  useEffect(() => {
    const loadComputations = async () => {
      try {
        const formattedDate = currentDate.format("YYYY-MM-DD");
        await Promise.all([
          fetchBalanceOnDate(formattedDate),
          fetchNewCustomersOnDateCount(formattedDate),
        ]);
      } catch (err) {
        console.error("Computation load error:", err);
      }
    };
    loadComputations();
  }, [currentDate]);

  // Refresh all data
  const handleRefresh = async (e: CustomEvent) => {
    const formattedDate = currentDate.format("YYYY-MM-DD");

    await Promise.all([
      fetchRecords(formattedDate, recordCurrentPage, 5),
      fetchExpensesOnDate(formattedDate, expensesCurrentPage, 5),
      fetchBalanceOnDate(formattedDate),
      fetchNewCustomersOnDateCount(formattedDate),
    ]);

    e.detail.complete();
  };

  // Pagination handlers for records
  const handleRecordNextPage = () =>
    recordHasNextPage && setRecordCurrentPage((p) => p + 1);
  const handleRecordPrevPage = () =>
    recordHasPrevPage && setRecordCurrentPage((p) => p - 1);
  const handleRecordPageChange = (page: number) =>
    page >= 1 && page <= recordTotalPages && setRecordCurrentPage(page);

  // Pagination handlers for expenses
  const handleExpensesNextPage = () =>
    expensesHasNextPage && setExpensesCurrentPage((p) => p + 1);
  const handleExpensesPrevPage = () =>
    expensesHasPrevPage && setExpensesCurrentPage((p) => p - 1);
  const handleExpensesPageChange = (page: number) =>
    page >= 1 && page <= expensesTotalPages && setExpensesCurrentPage(page);

  return (
    <div className="flex flex-col gap-8 pt-8 bg-gray-100 overflow-y-auto h-full w-full text-black">
      {loading && <LoadingPage />}

      <IonRefresher
        slot="fixed"
        onIonRefresh={handleRefresh}
        className="text-gray-800"
      >
        <IonRefresherContent />
      </IonRefresher>

      <div className="px-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Customer
        </h1>
        <p className="text-sm text-gray-500">
          Track your customers, activity and history.
        </p>
      </div>

      {/* Dashboard Tiles */}
      <div className="px-4 grid gap-4 lg:gap-8 grid-cols-2 w-full h-fit">
        <DashboardTile
          title="Balance"
          value={formatNaira(balance || 0)}
          delta={1}
        />
        <DashboardTile
          title="Total Sales"
          value={formatNaira(totalSales || 0)}
          delta={1}
        />
        <DashboardTile
          title="Total Expenses"
          value={formatNaira(totalExpenses || 0)}
          delta={1}
        />
        <DashboardTile
          title="New Customer"
          value={newCustomerCount || 0}
          delta={1}
        />
      </div>

      <div className="flex flex-col gap-4 w-full  p-4 rounded-lg shadow-md bg-white min-h-[400px]">
        <DateHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />

        <div className="flex flex-col gap-8">
          {/* Records Section */}
          {records && records.length > 0 && (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-black">
                Room Sales ({salesCount || 0})
              </p>
              <div className="flex flex-col space-y-2">
                {records.map((event, index) => (
                  <div
                    onClick={() => router.push(`/record/${event.id}`)}
                    key={index}
                  >
                    <ScheduleCard
                      name={` ${event.customerName}`}
                      details={`Room ${event.roomName}- ${formatNaira(event.price)}`}
                    />
                  </div>
                ))}
              </div>

              {/* Record Pagination */}
              {recordTotalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                  <button
                    disabled={!recordHasPrevPage}
                    onClick={handleRecordPrevPage}
                    className="p-2"
                  >
                    <IonIcon icon={chevronBack} />
                  </button>

                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, recordTotalPages) }, (_, i) => {
                      let pageNum;
                      if (recordTotalPages <= 5) pageNum = i + 1;
                      else if (recordCurrentPage <= 3) pageNum = i + 1;
                      else if (recordCurrentPage >= recordTotalPages - 2)
                        pageNum = recordTotalPages - 4 + i;
                      else pageNum = recordCurrentPage - 2 + i;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handleRecordPageChange(pageNum)}
                          className={`min-w-8 h-8 ${
                            recordCurrentPage === pageNum
                              ? "font-bold bg-gray-200"
                              : ""
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={!recordHasNextPage}
                    onClick={handleRecordNextPage}
                    className="p-2"
                  >
                    <IonIcon icon={chevronForward} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Expenses Section */}
          {expenses && expenses.length > 0 && (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-black">
                Expenses ({expensesCount || 0})
              </p>
              {expenses.map((expense, index) => (
                <div
                  onClick={() => router.push(`/expenses/${expense.id}`)}
                  key={index}
                >
                  <ScheduleCard
                    name={expense.category}
                    details={`${formatNaira(expense.amount)}`}
                  />
                </div>
              ))}

              {/* Expenses Pagination */}
              {expensesTotalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                  <button
                    disabled={!expensesHasPrevPage}
                    onClick={handleExpensesPrevPage}
                    className="p-2"
                  >
                    <IonIcon icon={chevronBack} />
                  </button>

                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, expensesTotalPages) }, (_, i) => {
                      let pageNum;
                      if (expensesTotalPages <= 5) pageNum = i + 1;
                      else if (expensesCurrentPage <= 3) pageNum = i + 1;
                      else if (expensesCurrentPage >= expensesTotalPages - 2)
                        pageNum = expensesTotalPages - 4 + i;
                      else pageNum = expensesCurrentPage - 2 + i;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handleExpensesPageChange(pageNum)}
                          className={`min-w-8 h-8 ${
                            expensesCurrentPage === pageNum
                              ? "font-bold bg-gray-200"
                              : ""
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={!expensesHasNextPage}
                    onClick={handleExpensesNextPage}
                    className="p-2"
                  >
                    <IonIcon icon={chevronForward} />
                  </button>
                </div>
              )}
            </div>
          )}
          
          {(!records || records.length === 0) &&
            (!expenses || expenses.length === 0) && (

              <EmptyState className='py-8'/>
            )}

        </div>

        <Footer className="bg-white" />
      </div>

      {user && user.role !== "ADMIN" && <FloatingMenu />}
    </div>
  );
};

export default Home;
