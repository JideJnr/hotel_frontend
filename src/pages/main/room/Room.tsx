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

const Room = () => {
  const router = useIonRouter();
  const [activeTab, setActiveTab] = useState<"all" | "active">("all");

  const { fetchRooms, rooms } = useRoom();

  useEffect(() => {
    fetchRooms();
  }, []);

  // Derived counts
  const totalRooms = rooms?.length || 0;
  const activeRooms = rooms?.filter((r) => r.isActive)?.length || 0;

  // Filter based on activeTab
  const displayedRooms =
    activeTab === "all" ? rooms : rooms.filter((r) => r.isActive);

  return (
    <div className="p-4 dark:bg-gray-100 w-full h-full flex flex-col gap-6">
      {/* Dashboard Tiles */}
      <div className="grid gap-4 lg:gap-8 grid-cols-2 md:grid-cols-3 w-full h-fit my-4">
        <DashboardTile title="Total Rooms" value={totalRooms} delta={1} />
        <DashboardTile title="Active Rooms" value={activeRooms} delta={1} />
      </div>

      {/* Add New Button */}
      <div className="w-fit ml-auto mr-2">
        <button
          className="text-black"
          onClick={() => router.push(`/register/room/stepone`)}
        >
          Add New
        </button>
      </div>

      {/* Tabs */}
      <IonSegment
        value={activeTab}
        onIonChange={(e) => setActiveTab(e.detail.value as "all" | "active")}
        className="mb-2 bg-white shadow-md rounded-lg"
      >
        <IonSegmentButton value="all">
          <IonLabel className="text-black">All Rooms</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="active">
          <IonLabel>Active Rooms</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      {/* Room List */}
      <div className="space-y-4">
        {displayedRooms?.map((room, index) => (
          <div
            key={room.id || index}
            onClick={() => router.push(`/room/${room.id}`)}
          >
            <ScheduleCard
              name={room.title}
              details={room.description || room.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
