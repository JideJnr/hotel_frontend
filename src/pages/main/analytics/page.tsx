// Analytics.tsx
import {  IonPage, IonButton, useIonRouter } from "@ionic/react";
import  { useState } from "react";
import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import ScheduleCard from "../../../components/templates/card/ScheduleCard";
import { FormHeader } from "../../../components/forms";
import SearchModal from "../../../components/modal/AnalyticsModal";
import { useAnalytics } from "../../../contexts/data/AnalyticsContext";

const Analytics = () => {
  const router = useIonRouter();
  const [showSearch, setShowSearch] = useState(true); 
  const { overview, loading } = useAnalytics();

  return (
    <IonPage>
      <FormHeader />

      {/* Search modal - Pass close handler */}
      <SearchModal 
        isOpen={showSearch} 
        onClose={() => setShowSearch(false)} 
      />

            <div className="flex flex-col gap-8 px-4 py-8 bg-gray-100 overflow-y-auto h-full w-full text-black">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Analytics
            </h1>
            <p className="text-sm text-gray-500">
              Track your customers, activity and history.
            </p>
          </div>

          {/* 🔎 Button to reopen search */}
          <IonButton size="small" onClick={() => setShowSearch(true)}>
            Reopen Search
          </IonButton>
        </div>

        <div className="grid gap-4 lg:gap-8 grid-cols-2 w-full h-fit">
          <DashboardTile title="Balance " value={2} delta={1} />
          <DashboardTile title="Total Sales" value={2} delta={1} />
          <DashboardTile title="Total Expenses " value={2} delta={1} />
          <DashboardTile title="Customer Registered" value={2} delta={1} />
        </div>

        {overview?.customers && (
          <div className="space-y-4">
            <p className="text-black text-xl">Room Sales</p>
            {overview?.customers.map((event, index) => (
              <div key={index} onClick={() => router.push(`/record/a`)}>
                <ScheduleCard
                  name={event.customerName}
                  details={`Room ${event.RoomNumber}`}
                />
              </div>
            ))}
          </div>
        )}

        {overview?.expenses && (
          <div className="space-y-4">
            <p className="text-black text-xl">Expenses</p>
            {overview?.expenses.map((expenses, index) => (
              <div key={index} onClick={() => router.push(`/expenses/a`)}>
                <ScheduleCard
                  name={expenses.expenseType}
                  details={`N ${expenses.price}`}
                />
              </div>
            ))}
          </div>
        )}

    
      </div>
    </IonPage>
  );
};

export default Analytics;