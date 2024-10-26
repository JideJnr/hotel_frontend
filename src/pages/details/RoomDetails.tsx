import { useParams } from "react-router";
import { useDataContext } from "../../context/dataContext";
import Button from "../../components/button/button";
import { FormProps } from "../register/customer/StepOne";
import useUpdateFunction from "../../function/useUpdateFunction";
import { auth, db } from "../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const RoomDetails = ({ formData: data, setFormData: setModal }: FormProps) => {
  const { user } = useDataContext();
  
  const recordPath = `roomRecord/${data.id}`;
  const roomPath = data ? `hotel/${data.location}/rooms/${data.room}` : null;
  const clientPath = data ? `clientRecord/${data.customerId}` : null;
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

  

  const handleCheckout = async () => {
    try {
     
        await updateRoomRecord({
          active: false,
          currentGuest: null,
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
    }
  };

  if (!user || !user.location) {
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
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-3 border-b py-6 text-xs">
        <p className="flex justify-between">
          <span className="text-gray-400">Receipt No.:</span>
          <span>{data?.id}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Customer:</span>
          <span>{data.clientName}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Host:</span>
          <span>{data.host}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Date:</span>
          <span>{data.date}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Time:</span>
          <span>{data.date}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Order Type:</span>
          <span>{data.method}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Payment Method:</span>
          <span>{data.order}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Status:</span>
          <span>{data.status}</span>
        </p>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="flex">
            <th className="w-full py-2">Product</th>
            <th className="min-w-[44px] py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex">
            <td className="flex-1 py-1">Room {data.room}</td>
            <td className="min-w-[44px]"></td>
          </tr>
        </tbody>
      </table>

      <div className="border-b border-dashed"></div>

      <div className="grid grid-cols-1 gap-2">
        {data.status === "Active" && (
          <Button text="Check Out" className="w-full" onClick={handleCheckout} />
        )}
        <Button text="Report Transaction" className="w-full" />
        <Button
          text="Close"
          className="w-full !bg-black"
          onClick={() => setModal(false)}
        />
      </div>
    </div>
  );
};

export default RoomDetails;
