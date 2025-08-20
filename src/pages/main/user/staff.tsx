import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import { useEffect, useState } from "react";
import { useStaff } from "../../../contexts/data/StaffContext";
import { getNameInitials } from "../../../utils/getInitials";
import {  IonPage, useIonRouter } from "@ionic/react";
import Footer from "../../../components/footer/footer";
import ScheduleCard from "../../../components/templates/card/ScheduleCard";
import { FormHeader } from "../../../components/forms";
import StaffAnalyticsModal from "../../../components/modal/StaffModal";


const Users = () => {
  const router = useIonRouter();
  const { fetchStaffs, staffs } = useStaff();
  const [showSearch, setShowSearch] = useState(false);

 
    useEffect(() => {
      refresh();
    }, []);

       const refresh = async (e?: CustomEvent) => {
      try {
        await Promise.all([
          fetchStaffs()
        ]);
      } catch (err) {
        console.error("Refresh error:", err);
      } finally {
        if (e && e.detail && typeof e.detail.complete === "function") {
          e.detail.complete();
        }
      }
    };
  return (
  <IonPage>
    <FormHeader />

            <StaffAnalyticsModal 
          isOpen={showSearch} 
          onClose={() => setShowSearch(false)} 
        />

    <div className="w-full h-full flex flex-col  pt-8 gap-4 bg-gray-100 overflow-y-auto text-black">


          <div className="px-4">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Staff</h1>
            <p className="text-sm text-gray-500">Track your staffs, activity and history.</p>
          </div>

          <div className="px-4 grid gap-4 lg:gap-8  grid-cols-2 md:grid-cols-3 w-full h-fit my-4 ">
            <DashboardTile title="Total Staffs" value={ 0} delta={1}  />
            <DashboardTile title="Active Staffs" value={ 0} delta={1} />
          </div>

          <div className="pt-8 px-4 flex flex-col gap-4  bg-white rounded-lg shadow-md p-4 h-full">

            <div className="flex ">
            
              <h2 className="text-lg font-semibold text-black">Active Staffs</h2>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 my-auto ml-auto mr-2" onClick={() => setShowSearch(true)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>


            </div>
            
            <div className="w-full h-full flex flex-col gap-2 ">
              {staffs.map((staff:any) => (
                <div
                  key={staff.id}
                  onClick={() => router.push(`/staff/${staff.id}`)}
                >
                  <ScheduleCard
                
                    name={staff.fullName}
                    details={staff.email}
                    avatar={
                      <div className="w-12 h-12 p-2 font-semibold rounded-full bg-gray-200 flex items-center !w-full">
                        {getNameInitials(staff.fullName)}
                      </div>
                    }
                  >

                  </ScheduleCard>
                </div>
              ))}
            </div>
          
            <Footer/>
  
          </div>
        
        
    </div>
   
  </IonPage>
    
  );
};

export default Users;
