import { useParams } from "react-router";
import { useDataContext } from "../../../context/dataContext";
import Button from "../../../components/button/button";
import { FormProps } from "../../register/customer/StepOne";
import useUpdateFunction from "../../../function/useUpdateFunction";
import { auth, db } from "../../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

const RecordDetails = ({
  formData: data,
  setFormData: setModal,
}: FormProps) => {
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
  const [loading, setLoading] = useState(false);
  const handleCheckout = async () => {
    setLoading(true);
    try {
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
      setLoading(false);
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
    <>
      <div className="w-full flex ">
        <p onClick={() => setModal(false)} className="ml-auto mr-4">
          x
        </p>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-3 border-b py-6 text-xs">
          <p className="flex justify-between">
            <span className="text-gray-400">Receipt No.:</span>
            <span>{data?.id}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Customer:</span>
            <span>{data.customerName}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Host:</span>
            <span>{data.hostID}</span>
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
            <span>{data.orderMethod}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Payment Method:</span>
            <span>{data.paymentMethod}</span>
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

        {user && user.role !== "admin" && (
          <div className="grid grid-cols-1 gap-2">
            <Button
              text={`${data.status === "active" ? "Check Out" : "Checked Out"}`}
              className={`w-full ${data.status !== "active" && "bg-gray-400"}`}
              onClick={handleCheckout}
              loading={loading}
              disabled={data.status !== "active"}
            />

            <Button text="Report Transaction" className="w-full bg-red-500" />
          </div>
        )}
      </div>
    </>
  );
};

export default RecordDetails;
