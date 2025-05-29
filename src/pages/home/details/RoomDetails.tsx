import { useParams } from "react-router";
import { useDataContext } from "../../../context/dataContext";
import Button from "../../../components/button/button";
import { FormProps } from "../../register/customer/StepOne";
import useUpdateFunction from "../../../function/useUpdateFunction";
import { auth, db } from "../../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import DashboardTile from "../../../components/dashboardtiles/DashboardTiles";
import { useState } from "react";

const RoomDetails = ({ formData: data, setFormData: setModal }: FormProps) => {
  const { user } = useDataContext();
  console.log(data);
  const recordPath = `roomRecord/${data.currentGuest?.docId}`;
  const roomPath = data ? `hotelRooms/${data.id}` : null;
  const clientPath = data ? `clientRecord/${data.currentGuest?.id}` : null;
  const activityPath = "activitiesRecord";

  const {
    error: updateRoomError,
    updateLoading: updateRoomLoading,
    updateRecord: updateRoomRecord,
  } = useUpdateFunction(roomPath || ""); // Provide a default to avoid null

  const {
    error: updateClientError,
    updateLoading: updateClientLoading,
    updateRecord: updateClientData,
  } = useUpdateFunction(clientPath || ""); // Provide a default to avoid null

  const {
    error: updateRecordError,
    updateLoading: updateRecordLoading,
    updateRecord: updateRecordData,
  } = useUpdateFunction(recordPath);

  const { reloadData } = useDataContext();
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckout = async () => {
    try {
      setIsLoading(true); // Start loading

      await updateRoomRecord({
        currentGuest: null,
        docId: null,
        status: "available",
      });

      await updateRecordData({
        checkedOutBy: auth.currentUser?.uid,
        checkedOutAt: new Date(),
        status: "Checked Out",
      });

      await updateClientData({
        checkedOutBy: auth.currentUser?.uid,
        lastSeen: new Date(),
        active: "false",
      });

      await addDoc(collection(db, activityPath), {
        details: `${data.customerName} checked out`,
        hostId: auth.currentUser?.uid,
        createdAt: serverTimestamp(),
      });

      await reloadData();
      setModal(false);
    } catch (err) {
      console.error("Error updating room status:", err);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  if (!user) {
    return <div>Loading user...</div>;
  }

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
    <>
      <div className="flex w-full">
        <p
          className="flex ml-auto mr-4 text-gray-400"
          onClick={() => setModal(false)}
        >
          X
        </p>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-3 border-b py-6 text-xs">
          <p className="flex justify-between">
            <span className="text-gray-400">Room No.:</span>
            <span>Room {data?.id}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span>{data.status}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Short Rest Price:</span>
            <span>{data.shortRest}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Lodge Price:</span>
            <span>{data.lodge}</span>
          </p>
        </div>

        <div className="flex flex-col gap-4 px-4 py-8">
          {data && data.currentGuest && (
            <>
              <p>Current Guest</p>
              <div className="w-full text-left">
                <img />
                <p>{data.currentGuest.name}</p>
              </div>

              <div className="border-b border-dashed"></div>

              <p>Code Status : Available for cleaning</p>

              <div className="border border-black px-4 py-2 rounded-md text-md font-semibold">
                <p className="text-center">
                  Access Codes :<span> Agsgsba</span>
                </p>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 gap-2">
            {data.status === "active" && (
              <>
                {user && user.role !== "admin" ? (
                  <Button
                    text="Check Out"
                    className="w-full"
                    onClick={handleCheckout}
                    loading={isLoading}
                    loadingText="Checking Out ..."
                  />
                ) : (
                  <Button
                    text="Ask To Check Out"
                    className="w-full"
                    onClick={handleCheckout}
                    loading={isLoading}
                    loadingText="Checking Out ..."
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
