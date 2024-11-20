import { useMemo, useState } from "react";
import "../../style.css";
import DashboardTile from "../../components/dashboardtiles/DashboardTiles";
import { useDataContext } from "../../context/dataContext";
import Table, { Column } from "../../components/table/table";
import { IonContent, IonIcon } from "@ionic/react";
import RoomDetails from "../home/details/RoomDetails";
import CreateRoom from "../register/createroom/CreateRoom";
import { DataProps } from "../home/Home";
import { filterData } from "../../utils/filterData";

const Room = ({ formData }: DataProps) => {
  const { user, room, loading, error } = useDataContext();

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
        <CreateRoom formData={selectedData} setFormData={setCreateModal} />
      )}

      {!roomModal && !createModal && (
        <div className="flex flex-col gap-4 px-4 py-8 bg-gray-100 w-full h-full">
          <div className="grid gap-4 lg:gap-8 md:grid-cols-3 w-full h-fit ">
            <DashboardTile label="Room Available" unit={availableRoom.length} />

            <DashboardTile label="Room Active" unit={activeRoom.length} />
            <DashboardTile label="Room Unavailable" unit={bookedRoom.length} />
          </div>

          {activeRoom && activeRoom.length !== 0 && (
            <div className="flex flex-col ">
              <p>Active Rooms</p>
              <div className="flex overflow-x-auto gap-2 w-full p-2">
                {activeRoom.map((room) => (
                  <div
                    key={room.id}
                    className="flex flex-col items-center justify-center gap-1.5 text-center"
                    onClick={() => {
                      setSelectedData(room);
                      setRoomModal(true);
                    }}
                  >
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-emerald-800 shadow-lg  dark:shadow-lg dark:shadow-emerald-800/80 font-medium  text-sm p-2 rounded-full text-center w-12 h-12 mx-auto "
                    >
                       <p className="text-[12px] font-medium leading-[20px] tracking-[-0.13px]">
                      {room.roomNumber}
                    </p>
                    </button>
                   
                  </div>

                  
                ))}
              </div>
            </div>
          )}

          <div>
            <Table
              columns={columns}
              data={filteredRoom}
              onClick={(row) => {
                setSelectedData(row);
                setRoomModal(true);
              }}
            >
              {user && user.role === "admin" && (
                <div className="w-full flex  p-2 bg-[#f5f5f5] ">
                  <button
                    onClick={() => setCreateModal(true)}
                    className="ml-auto bg-orange-400 px-2 py-1 rounded-md text-white"
                  >
                    Add New
                  </button>
                </div>
              )}
            </Table>
          </div>
        </div>
      )}
    </IonContent>
  );
};

export default Room;
