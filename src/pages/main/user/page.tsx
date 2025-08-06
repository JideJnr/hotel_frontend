import { useHistory } from "react-router-dom";
import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import { useEffect, useState } from "react";
import { useCustomer } from "../../../contexts/CustomerContext";

const mockClients = [
  {
    id: "user1",
    clientName: "John Doe",
    userImg: "https://randomuser.me/api/portraits/men/10.jpg",
    userInitial:'JD'
  },
  {
    id: "user2",
    clientName: "Jane Smith",
    userImg: "https://randomuser.me/api/portraits/women/20.jpg",
    userInitial:'JD'
  },
  {
    id: "user3",
    clientName: "Mike Johnson",
    userImg: "",
    userInitial:'JD'
  },
];

const Users = () => {
  const history = useHistory(); 
  const { fetchCustomers, customers } = useCustomer();

    useEffect(() => {
      fetchCustomers()
    }, []);

  console.log("Fetched Customers:", customers);

  const getInitials = (name: string): string => {
  if (!name) return '';
  const words = name.trim().split(' ');
  return words.map(w => w[0].toUpperCase()).join('').slice(0, 2);
};

// inside Users component
const [clientsWithInitials, setClientsWithInitials] = useState([]);

useEffect(() => {
    fetchCustomers()
}, []);

useEffect(() => {
  if (customers.length) {
    const updated = customers.map((customer) => ({
      ...customer,
      userInitial: getInitials(customer?.fullName),
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
              onClick={() => history.push(`/user/${client.id}`)}
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
