import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import { useEffect, useState } from "react";
import { useCustomer } from "../../../contexts/data/CustomerContext";
import { getNameInitials } from "../../../utils/getInitials";
import { useIonRouter } from "@ionic/react";


const Users = () => {
  const router = useIonRouter();
  const { fetchCustomers, customers } = useCustomer();

    useEffect(() => {
      fetchCustomers()
    }, []);

const [clientsWithInitials, setClientsWithInitials] = useState([]);

useEffect(() => {
  if (customers.length) {
    const updated = customers.map((customer) => ({
      ...customer,
      userInitial: getNameInitials(customer?.fullName),
    }));
    setClientsWithInitials(updated);
  }
}, [customers]);


  return (
  
      <div className="w-full h-full flex flex-col p-4 gap-4 bg-gray-100 overflow-y-auto">
          <div className="grid gap-4 lg:gap-8  grid-cols-2 md:grid-cols-3 w-full h-fit my-4 ">
          <DashboardTile title="Total Customers" value={1} delta={1} subtitle="vs yesterday" />
          <DashboardTile title="Active Customers" value={2} delta={1} />
        </div>
        <h2 className="text-xl font-bold text-black">Recent Clients</h2>
        <div className="w-full h-full flex flex-col gap-2 bg-white rounded-lg shadow-md p-4">
          {clientsWithInitials.map((client) => (
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
                      ) : client.userInitial ? (
                        <button
                          type="button"
                          className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <span className="flex w-8 h-8 flex-shrink-0 justify-center items-center size-4 bg-white border border-gray-200 text-[10px] font-semibold uppercase text-gray-600 rounded-full ">
                            {client.userInitial}
                          </span>
                          
                        </button>
                      ) : null}
                      {client.fullName}

            </div>
          ))}
        </div>
      </div>
    
  );
};

export default Users;
