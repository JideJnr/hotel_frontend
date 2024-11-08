import React from "react";
import { DataProps } from "../home/Home";
import { useDataContext } from "../../context/dataContext";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const Users = ({ formData }: DataProps) => {
  const { clients } = useDataContext();

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4">
          

      <h2>Recent</h2>
<div>
      {clients && clients.length > 0 ? (
        clients.map((client) => (
          <div key={client.id} className="flex items-center px-2 py-1 border-y">
            <img src={client.profilePicture || "default.jpg"} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
            <div className="flex flex-col flex-1">
              <p className="font-semibold">{client.name||'name'}</p>
              <p className="text-sm text-gray-500">Last Seen: {client.lastSeen}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No clients available</p>
      )}
      </div>
    </div>
  );
};

export default Users;
