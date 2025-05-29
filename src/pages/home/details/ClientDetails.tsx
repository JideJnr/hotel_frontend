import { useDataContext } from "../../../context/dataContext";
import Button from "../../../components/button/button";
import { FormProps } from "../../register/customer/StepOne";

import useFetchData from "../../../hooks/useFetchData";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../firebase";

const ClientDetails = ({
  formData: data,
  setFormData: setModal,
}: FormProps) => {
  const { user } = useDataContext();

  const [lodgeHistory, setLodgeHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLodgeHistory = async () => {
      if (!data?.id) return;

      try {
        setLoading(true);
        setError(null);

        // Correctly reference the collection path
        const ref = collection(db, "clientRecord", data.id, "lodgeHistory");
        const q = query(ref);
        const querySnapshot = await getDocs(q);

        const fetchedData: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() });
        });

        setLodgeHistory(fetchedData);
      } catch (err) {
        console.error("Error fetching lodge history:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchLodgeHistory();
  }, [data?.id]);

  console.log(lodgeHistory);
  console.log(data);

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
    <div className="w-full h-full flex flex-col bg-gray-100 p-4">
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
            src={"https://via.placeholder.com/50"}
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
                    <Button text="Check Out" className="w-full" />
                  ) : (
                    <Button text="Ask To Check Out" className="w-full" />
                  )}
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 ">
          <p>Lodge History</p>
          <div className="w-full h-full max-h-[50vh] overflow-y-auto">
            {lodgeHistory && lodgeHistory.length > 0 ? (
              lodgeHistory.map((history) => (
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
              ))
            ) : (
              <p>No clients available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
