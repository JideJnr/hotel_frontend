// Analytics.tsx
import { IonIcon, IonPage, IonButton, useIonRouter } from "@ionic/react";
import React, { useState } from "react";
import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import ScheduleCard from "../../../components/templates/card/ScheduleCard";
import { FormHeader } from "../../../components/forms";
import SearchModal from "../../../components/modal/AnalyticsModal";

const Analytics = () => {
  const router = useIonRouter();
  const [showSearch, setShowSearch] = useState(true); // Modal opens by default

  const expenses = [
    { expenseType: "Cleaning Supplies", price: "45.00" },
    { expenseType: "Toiletries", price: "120.50" },
    { expenseType: "Maintenance", price: "75.25" },
  ];

  const record = [
    { customerName: "Dressage Practice", RoomNumber: 2 },
    { customerName: "Polo", RoomNumber: 2 },
    { customerName: "Barrel Racing Practice", RoomNumber: 2 },
  ];

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

        {expenses.length === 0 ? (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
            <IonIcon src="assets/svgs/announce.svg" />
            <div className="overflow-hidden whitespace-nowrap flex-1">
              <div className="animate-marquee">
                <p className="text-sm font-medium text-dark">
                  You have not registered any expense today
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="space-y-4">
          <p className="text-black text-xl">Room Sales</p>
          {record.map((event, index) => (
            <div key={index} onClick={() => router.push(`/record/a`)}>
              <ScheduleCard
                name={event.customerName}
                details={`Room ${event.RoomNumber}`}
              />
            </div>
          ))}
        </div>

        {expenses.length > 0 && (
          <div className="space-y-4">
            <p className="text-black text-xl">Expenses</p>
            {expenses.map((expenses, index) => (
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