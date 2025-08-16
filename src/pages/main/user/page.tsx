import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import { useEffect, useState } from "react";
import { useCustomer } from "../../../contexts/data/CustomerContext";
import { getNameInitials } from "../../../utils/getInitials";
import { IonButton, useIonRouter } from "@ionic/react";
import { useComputation } from "../../../contexts/data/ComputationContext";
import SearchModal from "../../../components/modal/SearchModal";


const Users = () => {
  const router = useIonRouter();
  const { fetchCustomers, customers } = useCustomer();
    const [showSearch, setShowSearch] = useState(false);

  const { totalCustomerCount, activeCustomerCount , fetchActiveCustomersCount, fetchTotalCustomersCount} = useComputation();

    useEffect(() => {
      fetchCustomers();
      fetchActiveCustomersCount();
      fetchTotalCustomersCount();  
    }, []);



  return (
  
      <div className="w-full h-full flex flex-col px-4 py-8 gap-4 bg-gray-100 overflow-y-auto text-black">
  

      <SearchModal 
        isOpen={showSearch} 
        onClose={() => setShowSearch(false)} 
      />

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Customer</h1>
          <p className="text-sm text-gray-500">Track your customers, activity and history.</p>
        </div>

        <div className="grid gap-4 lg:gap-8  grid-cols-2 md:grid-cols-3 w-full h-fit my-4 ">
          <DashboardTile title="Total Customers" value={totalCustomerCount || 0} delta={1}  />
          <DashboardTile title="Active Customers" value={activeCustomerCount || 0} delta={1} />
        </div>

        <div className="flex flex-col gap-4  bg-white rounded-lg shadow-md p-4">

          <div className="flex ">
        
          <h2 className="text-xl font-bold text-black">Recent Clients</h2>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-auto mr-2" onClick={() => setShowSearch(true)}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>


        </div>
        <div className="w-full h-full flex flex-col gap-2 ">
          {customers.map((client) => (
            <div
              key={client.id}
              className="flex items-center px-2 py-2 border-y cursor-pointer bg-white text-black"
              onClick={() => router.push(`/user/${client.id}`)}
            >
                      {client.userImg ? (
                        <button
                          type="button"
                          className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                        >
                          <img
                            className="flex-shrink-0 size-4 w-8 h-8 rounded-full"
                            src={client.userImg}
                            alt="Image Note"
                          />
                          {client.fullName}
                        </button>
                      ) : client.fullName ? (
                        <button
                          type="button"
                          className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <span className="flex w-8 h-8 flex-shrink-0 justify-center items-center size-4 bg-white border border-gray-200 text-[10px] font-semibold uppercase text-gray-600 rounded-full ">
                            {getNameInitials(client.fullName)}
                          </span>
                          
                        </button>
                      ) : null}
                      {client.fullName}

            </div>
          ))}
        </div>

  
        </div>
      </div>
    
  );
};

export default Users;
