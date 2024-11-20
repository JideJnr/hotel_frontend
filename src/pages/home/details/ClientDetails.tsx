import { useDataContext } from "../../../context/dataContext";
import Button from "../../../components/button/button";
import { FormProps } from "../../register/customer/StepOne";
import Table, { Column } from "../../../components/table/table";
import { useMemo } from "react";

const ClientDetails = ({ formData: data, setFormData: setModal }: FormProps) => {
  const { user } = useDataContext();

  

  


  if (!data) {
    return (
      <div>
        No data found
        <Button
          text="Close"
          className="w-full"
          onClick={() => setModal(false)}
        />
      </div>
    );
  }

  return (
    < div className="w-full h-full flex flex-col bg-gray-100 p-4">
      <div className="flex w-full">
        <p
          className="flex ml-auto mr-4 text-gray-400"
          onClick={() => setModal(false)}
        >
          X
        </p>
      </div>
      <div className="flex flex-col gap-4 p-4">

        <div className="flex w-full h-fit">
        <img
                src={ "https://via.placeholder.com/50"}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto"
              />
        </div>
        <div className="flex flex-col gap-6 border-b py-6 text-xs">
          <p className="flex text-center mx-auto font-semibold text-2xl">
             {data.name}
          </p>
          <div className="flex flex-col gap-2">

          
          <p className="flex justify-between">
            <span className="text-gray-400">Phone Number:</span>
            <span>{data.phone}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Email:</span>
            <span>{data.email}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Address:</span>
            <span>{data.address}</span>
          </p>
          </div>
        </div>
        {data && data.currentRoom && (
        <div className="flex flex-col gap-4 px-4 py-8">
        
            <>
              <p>Current Guest</p>
              <div className="w-full text-left">
                <img />
                <p>{data.currentRoom.name}</p>
              </div>

              <div className="border-b border-dashed"></div>

              <p>Code Status : Available for cleaning</p>

            </>
        

          <div className="grid grid-cols-1 gap-2">
            {data.status === "active" && (
              <>
                {user && user.role !== "admin" ? (
                  <Button
                    text="Check Out"
                    className="w-full"
                    
                  />
                ) : (
                  <Button
                    text="Ask To Check Out"
                    className="w-full"
                 
                  />
                )}
              </>
            )}
          </div>

        </div>
          )}

        <div className="flex flex-col gap-4 ">
         <p>
          Lodge History
         </p>
        </div>


      </div>
    </div>
  );
};

export default ClientDetails;
