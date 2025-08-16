import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import ScheduleCard from "../../../components/templates/card/ScheduleCard";
import { useRoom } from "../../../contexts/data/RoomContext";
import { useComputation } from "../../../contexts/data/ComputationContext";

const Room = () => {
  const router = useIonRouter();
  const [activeTab, setActiveTab] = useState<"all" | "active">("all");

  const { fetchRooms, rooms } = useRoom();
  const {fetchTotalRoomsCount, fetchActiveRoomsCount, totalRoomCount, activeRoomCount } = useComputation();

  useEffect(() => {
    fetchRooms();
    fetchTotalRoomsCount();
    fetchActiveRoomsCount();
  }, []);

  const handleAddNew = () => router.push("/register/room/stepone");
  const handleRoomClick = (id?: string) => id && router.push(`/room/${id}`);

  const TABS = [
    { value: "all", label: "All Rooms" },
    { value: "active", label: "Active Rooms" },
  ] as const;

  const filteredRooms =
    activeTab === "active"
      ? rooms.filter((room) => room.isAvailable) // Adjust filter condition
      : rooms;

  return (

    <div className="px-4  py-8 text-black bg-gray-100 w-full h-full flex flex-col gap-6 overflow-y-auto ">

      <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Rooms</h1>
            <p className="text-sm text-gray-500">Manage your rooms, availability and details.</p>
          </div>

      </div>

      
      <div className="grid gap-4 lg:gap-8 grid-cols-2 md:grid-cols-3 w-full h-fit my-4">
        <DashboardTile title="Total Rooms" value={totalRoomCount||0} delta={1} />
        <DashboardTile title="Active Rooms" value={activeRoomCount||0} delta={1} />
      </div>

      <div className="w-fit ml-auto mr-2">
        <button className="text-black" onClick={handleAddNew}>
          Add New
        </button>
      </div>


      <IonSegment
        value={activeTab}
        onIonChange={(e) => setActiveTab(e.detail.value as "all" | "active")}
        className="mb-2 bg-white shadow-md rounded-lg"
      >
        {TABS.map(({ value, label }) => (
          <IonSegmentButton key={value} value={value}>
            <IonLabel className="text-black">{label}</IonLabel>
          </IonSegmentButton>
        ))}
      </IonSegment>


      <div className="space-y-4">
        {filteredRooms.map((room, index) => (
          <div key={room.id || index} onClick={() => handleRoomClick(room.id)}>
            <ScheduleCard
              name={room.name||'test'}
              details={room.description || room.title ||'test' }
            />
          </div>
        ))}
      </div>
    </div>
  
  );
};

export default Room;
