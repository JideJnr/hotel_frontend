// Analytics.tsx
import {  IonPage, IonButton, useIonRouter } from "@ionic/react";
import  { useState } from "react";
import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import ScheduleCard from "../../../components/templates/card/ScheduleCard";
import { FormHeader } from "../../../components/forms";
import SearchModal from "../../../components/modal/AnalyticsModal";
import { useAnalytics } from "../../../contexts/data/AnalyticsContext";
import Footer from "../../../components/footer/footer";
import { formatNaira } from "../../../utils/formatNaira";

const Analytics = () => {
  const router = useIonRouter();
  const [showSearch, setShowSearch] = useState(true); 
  const { overview, loading } = useAnalytics();

  const count: { customers: number; sales: number; expenses: number } = overview?.count || { customers: 0, sales: 0, expenses: 0 };
  const data = overview?.data || [];
  const sum = overview?.sum || { totalSales: 0, totalExpenses: 0 };
  const balance = sum?.totalSales - sum?.totalExpenses || 0; 

  return (
    <IonPage>
      <FormHeader />
      <SearchModal 
        isOpen={showSearch} 
        onClose={() => setShowSearch(false)} 
      />

      <div className="flex flex-col gap-8  py-8 bg-gray-100 overflow-y-auto h-full w-full text-black">
        <div className="flex justify-between items-center px-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
              Analytics
            </h1>
            <p className="text-sm text-gray-500">
              Track your customers, activity and history.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:gap-8 grid-cols-2 w-full h-fit px-4">
          <DashboardTile title="Balance " value={formatNaira(balance)} delta={1} />
          <DashboardTile title="Total Sales" value={formatNaira(sum?.totalSales)} delta={1} />
          <DashboardTile title="Total Expenses " value={formatNaira(sum?.totalExpenses)} delta={1} />
          <DashboardTile title="Customer Registered" value={count.customers} delta={1} />
        </div>

        <div className="flex flex-col  w-full flex-1 pt-4  rounded-lg shadow-md bg-white gap-8">
          <button
            onClick={() => setShowSearch(true)}
            className="w-fit ml-auto mr-4 flex items-center justify-center text-gray-600 hover:text-gray-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24" 
              strokeWidth={2} stroke="currentColor" 
              className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>

          </button>


          <div className="flex flex-col gap-8  px-4 ">

            {data?.records && data?.records.length > 0 && (
              <div className="space-y-4">
                <p className="text-black text-xl font-medium">Room Sold ({count.sales})</p>
                {data?.records.map((record:any, index:any) => (
                  <div key={index} onClick={() => router.push(`/expenses/${record.id}`)}>
                    <ScheduleCard
                      name={record.customerName}
                      details={`ROOM ${record.roomName}`}
                    />
                  </div>
                ))}
              </div>
            )}

            {data?.expenses && data?.expenses.length > 0 && (
              <div className="space-y-4">
                <p className="text-black text-xl font-medium">Expenses Recorded ({count.expenses})</p>
                {data?.expenses.map((expense:any, index:any) => (
                  <div key={index} onClick={() => router.push(`/expenses/${expense.id}`)}>
                    <ScheduleCard
                      name={expense.category}
                      details={`${formatNaira(expense.amount)}`}
                    />
                  </div>
                ))}
              </div>
            )}

            {data?.customers && data?.customers.length > 0 && (
              <div className="space-y-4">
                <p className="text-black text-xl font-medium">Customer Registered ({count.customers})</p>
                {data?.customers.map((event:any, index:any) => (
                  <div key={index} onClick={() => router.push(`/customer/${event.id}`)}>
                    <ScheduleCard
                      name={event.fullName}
                      details={` ${event.phone}`}
                    />
                  </div>
                ))}
              </div>
            )}

          </div>

          <Footer className="bg-white"/>

        </div>
    
      </div>
    </IonPage>
  );
};

export default Analytics;