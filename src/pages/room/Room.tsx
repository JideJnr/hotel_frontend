import { useMemo, useState } from "react";
import "../../style.css";
import DashboardTile from "../../components/dashboardtiles/DashboardTiles";
import { useDataContext } from "../../context/dataContext";
import Table, { Column } from "../../components/table/table";
import { IonContent, IonIcon } from "@ionic/react";
import RoomDetails from "../details/RoomDetails";
import CreateRoom from "../register/createroom/CreateRoom";
import { DataProps } from "../home/Home";
import { filterData } from "../../utils/filterData";

const Room = ({ formData }: DataProps) => {
  const { room, loading, error } = useDataContext();

  const filteredRoom =
    room && formData?.value ? filterData(room, formData.value) : room;

  const activeRoom = filteredRoom.filter(
    (record) => record.status === "active",
  );
  const availableRoom = filteredRoom.filter(
    (room) => room.status === "available",
  );
  const bookedRoom = filteredRoom.filter((room) => room.status !== "available");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const columns: Column[] = useMemo(
    () => [
      {
        Header: "Room",
        accessor: "roomNumber",
        Cell: ({ value }: { value: string }) => (
          <div className="flex gap-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Passport"
              style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            />
            <p>Room {value}</p>
          </div>
        ),
      },
      {
        Header: "",
        accessor: "status",
        Cell: ({ value }: { value: string }) => (
          <div
            className={`flex gap-x-1.5 h-fit w-fit mx-auto rounded-full p-1 lg:px-2 bg-yellow-400/20`}
          >
            <p className="text-xs leading-5 text-gray-500 hidden lg:flex">
              <>{value}</>
            </p>

            <div
              className={`  h-1.5 w-1.5 rounded-full bg-yellow-400 flex  `}
            ></div>
          </div>
        ),
      },
    ],
    [],
  );

  const [roomModal, setRoomModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  console.log(room);
  return (
    <IonContent>
      {roomModal && (
        <RoomDetails formData={selectedData} setFormData={setRoomModal} />
      )}
      {createModal && (
        <CreateRoom formData={selectedData} setFormData={setRoomModal} />
      )}

      {!roomModal && !createModal && (
        <div className="flex flex-col gap-4 px-4 py-8">
          <div className="grid gap-4 lg:gap-8 md:grid-cols-3 w-full h-fit ">
            <DashboardTile label="Room Active" unit={activeRoom.length} />
            <DashboardTile label="Room Available" unit={availableRoom.length} />
            <DashboardTile label="Room Unavailable" unit={bookedRoom.length} />
          </div>

          <div className="flex flex-col gap-4">
            <p>Active Rooms</p>
            <div className="grid grid-cols-4 gap-2 w-full">
              {activeRoom.map((room) => (
                <div
                  key={room.id}
                  className="flex flex-col items-center justify-center gap-1.5 text-center"
                  onClick={() => {
                    setSelectedData(room);
                    setRoomModal(true);
                  }}
                >
                  <IonIcon
                    src="assets/svgs/users.svg"
                    className="border border-primary p-4 bg-[#ebe8fe] rounded-full text-[24px] text-primary"
                  ></IonIcon>
                  <span className="text-[12px] font-medium leading-[20px] tracking-[-0.13px]">
                    Room {room.id}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div>
              <button onClick={() => setCreateModal(true)}>Add New</button>
            </div>
            <Table
              columns={columns}
              data={filteredRoom}
              onClick={(row) => {
                setSelectedData(row);
                setRoomModal(true);
              }}
            />
          </div>
        </div>
      )}
    </IonContent>
  );
};

export default Room;
