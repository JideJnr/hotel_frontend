import { IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";

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

  return (
  
      <div className="w-full h-full flex flex-col p-4 gap-4 bg-gray-100">
          <div className="grid gap-4 lg:gap-8  grid-cols-2 md:grid-cols-3 w-full h-fit my-4 ">
          <DashboardTile title="Total Customers" value={1} delta={1} subtitle="vs yesterday" />
          <DashboardTile title="Active Customers" value={2} delta={1} />
        </div>
        <h2 className="text-xl font-bold text-black">Recent Clients</h2>
        <div>
          {mockClients.map((client) => (
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
                          {client.clientName}
                        </button>
                      ) : client.userInitial ? (
                        <button
                          type="button"
                          className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <span className="flex w-8 h-8 flex-shrink-0 justify-center items-center size-4 bg-white border border-gray-200 text-[10px] font-semibold uppercase text-gray-600 rounded-full ">
                            {client.userInitial}
                          </span>
                          {client.clientName}
                        </button>
                      ) : null}

            </div>
          ))}
        </div>
      </div>
    
  );
};

export default Users;
