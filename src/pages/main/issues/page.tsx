// Analytics.tsx
import {  IonPage, IonButton, useIonRouter } from "@ionic/react";
import  { useState } from "react";
import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import { FormHeader } from "../../../components/forms";
import SearchModal from "../../../components/modal/IssueModal";
import Footer from "../../../components/footer/footer";
import { getNameInitials } from "../../../utils/getInitials";
import ScheduleCard from "../../../components/templates/card/ScheduleCard";

const Issues = () => {
  const [showSearch, setShowSearch] = useState(false); 

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
              Issues
            </h1>
            <p className="text-sm text-gray-500">
              Track your issues, open, resolved and close.
            </p>
          </div>

          {/* 🔎 Button to reopen search */}
          <IonButton size="small" onClick={() => setShowSearch(true)}>
            Reopen Search
          </IonButton>
        </div>

        <div className="grid gap-4 lg:gap-8 grid-cols-2 w-full h-fit">
          <DashboardTile title="Open Issues " value={2} delta={1} />
          <DashboardTile title="Resolved Issues" value={2} delta={1} />
        </div>

    
      </div>

      <div className="pt-8 px-4 flex flex-col gap-4  bg-white rounded-lg shadow-md p-4 h-full">

            <div className="flex ">
            
              <h2 className="text-lg font-semibold text-black">Active Staffs</h2>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 my-auto ml-auto mr-2" onClick={() => setShowSearch(true)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>


            </div>
            
            <div className="w-full h-full flex flex-col gap-2 ">
           
           
          
            </div>
          
            <Footer/>
  
      vb</div>
        
    </IonPage>
  );
};

export default Issues;