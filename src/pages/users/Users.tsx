import React, { useState } from "react";
import { DataProps } from "../home/Home";
import { useDataContext } from "../../context/dataContext";
import { IonContent } from "@ionic/react";
import ClientDetails from "../home/details/ClientDetails";

const Users = ({ formData }: DataProps) => {
  const { clients } = useDataContext();
  const [clientModal, setClientModal] = useState(false);

  const [selectedData, setSelectedData] = useState(null);

  return (
    <IonContent>
      {clientModal && (
        <ClientDetails formData={selectedData} setFormData={setClientModal} />
      )}
      {!clientModal && (
        <div className="w-full h-full flex flex-col p-4 gap-4 bg-gray-100  ">
          <h2>Recent</h2>
          <div>
            {clients && clients.length > 0 ? (
              clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center px-2 py-1 border-y"
                  onClick={() => {
                    setClientModal(true);
                    setSelectedData(client);
                  }}
                >
                  <img
                    src={
                      client.profilePicture || "https://via.placeholder.com/50"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex flex-col flex-1">
                    <p className="font-semibold">{client.name || "name"}</p>
                    <p className="text-sm text-gray-500">Last Seen: </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No clients available</p>
            )}
          </div>
        </div>
      )}
    </IonContent>
  );
};

export default Users;
