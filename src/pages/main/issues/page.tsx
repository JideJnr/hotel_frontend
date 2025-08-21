// Analytics.tsx
import {  IonPage } from "@ionic/react";
import  { useState } from "react";
import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import { FormHeader } from "../../../components/forms";
import Footer from "../../../components/footer/footer";
import IssueAnalyticsModal from "../../../components/modal/IssueModal";

const Issues = () => {
  const [showSearch, setShowSearch] = useState(false); 

  return (
  <IonPage>
    <FormHeader />
    <IssueAnalyticsModal 
      isOpen={showSearch} 
      onClose={() => setShowSearch(false)} 
    />

    <div className="w-full h-full flex flex-col  pt-8 gap-4 bg-gray-100 overflow-y-auto text-black">

      <div className="px-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Issues</h1>
        <p className="text-sm text-gray-500">Track your issues, activity and history.</p>
      </div>

      <div className="px-4 grid gap-4 lg:gap-8  grid-cols-2 md:grid-cols-3 w-full h-fit my-4 ">
        <DashboardTile title="Total Issues" value={ 0} delta={1}  />
        <DashboardTile title="Active Issues" value={ 0} delta={1} />
      </div>

      <div className="pt-8 px-4 flex flex-col gap-4  bg-white rounded-lg shadow-md p-4 h-full">

        <div className="flex ">
            
              <h2 className="text-lg font-semibold text-black">Active Issues</h2>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 my-auto ml-auto mr-2" onClick={() => setShowSearch(true)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

        </div>
            
        <div className="w-full h-full flex flex-col gap-2 ">
            
        </div>
          
        <Footer/>
  
      </div>
        
        
    </div>
   
  </IonPage>   
  );
};

export default Issues;