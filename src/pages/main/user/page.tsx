import { IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";

const mockClients = [
  {
    id: "user1",
    name: "John Doe",
    profilePicture: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: "user2",
    name: "Jane Smith",
    profilePicture: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    id: "user3",
    name: "Mike Johnson",
    profilePicture: "",
  },
];

const Users = () => {
  const history = useHistory(); 

  return (
  
      <div className="w-full h-full flex flex-col p-4 gap-4 bg-gray-100">
          <div className="grid gap-4 lg:gap-8  grid-cols-2 md:grid-cols-3 w-full h-fit my-4 ">
          <DashboardTile title="Total Rooms" value={1} delta={1} />
          <DashboardTile title="Active Rooms" value={2} delta={1} />
        </div>
        <h2 className="text-xl font-bold text-black">Recent Clients</h2>
        <div>
          {mockClients.map((client) => (
            <div
              key={client.id}
              className="flex items-center px-2 py-2 border-y cursor-pointer bg-white text-black"
              onClick={() => history.push(`/user/${client.id}`)}
            >
              <img
                src= "https://via.placeholder.com"
                alt="Profile"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex flex-col">
                <p className="font-semibold">{client.name}</p>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default Users;
