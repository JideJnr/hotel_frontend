import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import { useEffect, useState } from "react";
import { useCustomer } from "../../../contexts/data/CustomerContext";
import { getNameInitials } from "../../../utils/getInitials";
import { IonButton, useIonRouter } from "@ionic/react";
import { useComputation } from "../../../contexts/data/ComputationContext";
import SearchModal from "../../../components/modal/SearchModal";
import Footer from "../../../components/footer/footer";
import ScheduleCard from "../../../components/templates/card/ScheduleCard";
import EmptyState from "../../../components/empty/empty";


const Users = () => {
  const router = useIonRouter();
  const { fetchActiveCustomers, activeCustomers , recentCustomers , fetchRecentCustomers} = useCustomer();
  const [showSearch, setShowSearch ] = useState(false);

  console.log("activeCustomers", activeCustomers);
  console.log("recentCustomers", recentCustomers);
  const { totalCustomerCount, activeCustomerCount , fetchActiveCustomersCount, fetchTotalCustomersCount} = useComputation();

    useEffect(() => {
      loadData(); // clean initial load
    }, []);

    const loadData = async () => {
      await Promise.all([
        fetchActiveCustomers(),
        fetchActiveCustomersCount(),
        fetchTotalCustomersCount(),
        fetchRecentCustomers()
      ]);
    };

    const handleRefresh = async (e: CustomEvent) => {
      await loadData();
      e.detail.complete();
    };



  return (
  
       
    <div className="flex flex-col gap-8  pt-8 bg-gray-100 overflow-y-auto h-full w-full text-black">
        
        <SearchModal 
          isOpen={showSearch} 
          onClose={() => setShowSearch(false)} 
        />

          <div className="px-4">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Customer</h1>
            <p className="text-sm text-gray-500">Track your customers, activity and history.</p>
          </div>

        <div className=" px-4 grid gap-4 lg:gap-8 grid-cols-2 w-full h-fit">
            <DashboardTile title="Total Customers" value={totalCustomerCount || 0} delta={1}  />
            <DashboardTile title="Active Customers" value={activeCustomerCount || 0} delta={1} />
          </div>

<div className="pt-8 px-4 flex flex-col gap-4 bg-white rounded-lg shadow-md p-4 h-full">

  {/* Active Customers */}
  {Array.isArray(activeCustomers) && activeCustomers.length > 0 && (
    <div className="w-full h-full flex flex-col gap-4 mb-4">
      <div className="flex">
        <h2 className="text-lg font-semibold text-black">Active Customer</h2>
      </div>
      {activeCustomers.map((client: any) => (
        <div
          key={client.id}
          onClick={() => router.push(`/user/${client.id}`)}
        >
          <ScheduleCard
            name={client.fullName}
            details={client.userName}
            avatar={
              <div className="w-12 h-12 p-2 font-semibold rounded-full bg-gray-200 flex items-center !w-full">
                {getNameInitials(client.fullName)}
              </div>
            }
          />
        </div>
      ))}
    </div>
  )}

  {/* Recent Customers */}
  {Array.isArray(recentCustomers) && recentCustomers.length > 0 && (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex">
        <h2 className="text-lg font-semibold text-black">Recent Customer</h2>
        {Array.isArray(activeCustomers) && activeCustomers.length === 0 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 ml-auto my-auto mr-2 cursor-pointer"
            onClick={() => setShowSearch(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        )}
      </div>

      {recentCustomers.map((client: any) => (
        <div
          key={client.id}
          onClick={() => router.push(`/user/${client.id}`)}
        >
          <ScheduleCard
            name={client.fullName}
            details={client.userName}
            avatar={
              <div className="w-12 h-12 p-2 font-semibold rounded-full bg-gray-200 flex items-center !w-full">
                {getNameInitials(client.fullName)}
              </div>
            }
          />
        </div>
      ))}
    </div>
  )}

  {/* Empty state (only if both are empty) */}
  {(!activeCustomers?.length && !recentCustomers?.length) && (
    <div className="py-4">
      <EmptyState />
    </div>
  )}

  <Footer />
</div>

        
      </div>
    
  );
};

export default Users;
