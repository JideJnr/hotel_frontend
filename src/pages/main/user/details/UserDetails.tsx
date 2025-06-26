import { useParams } from "react-router-dom";
import { IonContent } from "@ionic/react";
import Button from "../../../../components/button/button";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const data = null;
  const history = null

  return (
    <IonContent>
      <div className="w-full h-full flex flex-col p-4">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex w-full h-fit">
          <img
            src={"https://via.placeholder.com/50"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
        </div>
        <div className="flex flex-col gap-6 border-b py-6 text-xs">
          <p className="flex text-center mx-auto font-semibold text-2xl">
            {data?.name}
          </p>
          <div className="flex flex-col gap-2">
            <p className="flex justify-between">
              <span className="text-gray-400">Phone Number:</span>
              <span>{data?.phone}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span>{data?.email}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">Address:</span>
              <span>{data?.address}</span>
            </p>
          </div>
        </div>
        {data && data?.currentRoom && (
          <div className="flex flex-col gap-4 px-4 py-8">
            <>
              <p>Current Guest</p>
              <div className="w-full text-left">
                <img />
                <p>{data?.currentRoom.name}</p>
              </div>

              <div className="border-b border-dashed"></div>

              
            </>

            <div className="grid grid-cols-1 gap-2">
              {data?.status === "active" && (
                <>
                  
                    <Button text="Check Out" className="w-full" />
                  
                    <Button text="Ask To Check Out" className="w-full" />
                
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 ">
          <p>Lodge History</p>
          <div className="w-full h-full max-h-[50vh] overflow-y-auto">
           
                <div
                  key={history.id}
                  className="flex justify-between px-2 py-1 border-y"
                >
                  <div className="flex flex-col flex-1">
                    <p className="font-semibold">
                      {history.roomNumber || "name"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {" "}
                      Host : {history.hostName || "name"}{" "}
                    </p>
                  </div>
                  <div>Date</div>
                </div>
             
              <p>No clients available</p>
          
          </div>
        </div>
      </div>
    </div>
    </IonContent>
  );
};

export default UserDetails;
