import { IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";

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
  const history = useHistory(); // Ionic uses this for navigation

  return (
    <IonContent>
      <div className="w-full h-full flex flex-col p-4 gap-4 bg-gray-100">
        <h2 className="text-xl font-bold">Recent Clients</h2>
        <div>
          {mockClients.map((client) => (
            <div
              key={client.id}
              className="flex items-center px-2 py-2 border-y cursor-pointer"
              onClick={() => history.push(`/user/${client.id}`)}
            >
              <img
                src={client.profilePicture || "https://via.placeholder.com/50"}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex flex-col">
                <p className="font-semibold">{client.name}</p>
                <p className="text-sm text-gray-500">Last Seen: Just Now</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </IonContent>
  );
};

export default Users;
