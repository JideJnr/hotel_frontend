import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  useIonRouter,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { useEffect, useState } from "react";
import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import ScheduleCard from "../../../components/templates/card/ScheduleCard";
import { useRoom } from "../../../contexts/data/RoomContext";
import { useComputation } from "../../../contexts/data/ComputationContext";
import Footer from "../../../components/footer/footer";

const Room = () => {
  const router = useIonRouter();
  const [activeTab, setActiveTab] = useState<"available" | "active">("available");

  const { fetchRooms, rooms } = useRoom();
  const {fetchTotalRoomsCount, fetchActiveRoomsCount, totalRoomCount, activeRoomCount } = useComputation();
useEffect(() => {
  loadData(); // clean initial load
}, []);

const loadData = async () => {
  try {
    await Promise.all([
      fetchRooms(),
      fetchTotalRoomsCount(),
      fetchActiveRoomsCount(),
    ]);
  } catch (err) {
    console.error("Load data error:", err);
  }
};

const handleRefresh = async (e: CustomEvent) => {
  await loadData();
  e.detail.complete();
};

  const handleAddNew = () => router.push("/register/room/stepone");
  const handleRoomClick = (id?: string) => id && router.push(`/room/${id}`);

  const TABS = [
    { value: "available", label: "Available" },
    { value: "active", label: "Active" },
  ] as const;


const filteredRooms = (() => {
  switch (activeTab) {
    case "active":
      return rooms.filter((room) => room.active);
    default: // "all"
      return rooms.filter((room) => !room.active); // 👈 correct usage
  }
})();


  return (

    <div className="  pt-8 text-black bg-gray-100 w-full h-full flex flex-col gap-6 overflow-y-auto ">
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh} className="text-gray-800">
        <IonRefresherContent />
      </IonRefresher>
               
      <div className="px-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Rooms</h1>
            <p className="text-sm text-gray-500">Manage your rooms, availability and details.</p>
          </div>

      </div>

      
      <div className="px-4 grid gap-4 lg:gap-8 grid-cols-2 md:grid-cols-3 w-full h-fit my-4">
        <DashboardTile title="Total Rooms" value={totalRoomCount||0} delta={1} />
        <DashboardTile title="Active Rooms" value={activeRoomCount||0} delta={1} />
      </div>

      <div className=" px-4 w-fit ml-auto mr-2">
        <button className="text-black" onClick={handleAddNew}>
          Add New
        </button>
      </div>

      <div className="  flex flex-col gap-4 w-full h-full bg-white p-4 rounded-lg shadow-md ">
        <IonSegment
          value={activeTab}
          mode="md"   // 👈 force Material Design look (white + blue)
          onIonChange={(e) => setActiveTab(e.detail.value as "available" | "active")}
          className="    rounded-lg"
        >
          {TABS.map(({ value, label }) => (
            <IonSegmentButton key={value} value={value} mode="md"> {/* 👈 keep buttons in md mode too */}
              <IonLabel className="text-black">{label}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>
        <div className="space-y-2">
          {filteredRooms.map((room, index) => (
            <div key={room.id || index} onClick={() => handleRoomClick(room.id)}>
              <ScheduleCard
                name={room.name||'test'}
                details={room.description || room.title ||'test' }
              />
            </div>
          ))}
        </div>
        <Footer className=''/>
      </div>


    </div>
  
  );
};

export default Room;
