import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/react";
import { useState } from "react";
import GenericList from "../../../components/cards/GenericList";
import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import ScheduleCard from "../../../components/templates/card/DashboardCards";

type Room = {
  id: string;
  name: string;
  isActive: boolean;
  price: number;
};

const mockRooms: Room[] = [
  { id: "1", name: "Room A", isActive: true, price: 20000 },
  { id: "2", name: "Room B", isActive: false, price: 15000 },
  { id: "3", name: "Room C", isActive: true, price: 18000 },
  { id: "4", name: "Room D", isActive: false, price: 22000 },
];

const Room = () => {
  const [activeTab, setActiveTab] = useState<"all" | "active">("all");

  const filteredRooms =
    activeTab === "active"
      ? mockRooms.filter((room) => room.isActive)
      : mockRooms;

  const roomItems = filteredRooms.map((room) => ({
    id: room.id,
    name: room.name,
    value: room.price,
    type: room.isActive ? "active" : "inactive",
  }));

  // Room statistics for dashboard tiles
  const totalRooms = mockRooms.length;
  const activeRooms = mockRooms.filter((room) => room.isActive).length;
  const inactiveRooms = totalRooms - activeRooms;

  const events = [
  { title: 'Dressage Practice', time: '9:00AM - 11:00AM' },
  { title: 'Polo', time: '11:00AM - 12:00PM' },
  { title: 'Barrel Racing Practice', time: '12:00PM - 1:00PM' },
];


  return (
    <div className="p-4 dark:bg-gray-100 w-full h-full flex flex-col gap-6">
        {/* Dashboard Tiles */}
        <div className="grid gap-4 lg:gap-8  grid-cols-2 md:grid-cols-3 w-full h-fit my-4 ">
          <DashboardTile title="Total Rooms" value={totalRooms} delta={1} />
          <DashboardTile title="Active Rooms" value={activeRooms} delta={1} />
        </div>

        {/* Segment Filter */}
        <IonSegment
          value={activeTab}
          onIonChange={(e) =>
            setActiveTab(e.detail.value as "all" | "active")
          }
          className="mb-2"
        >
          <IonSegmentButton value="all">
            <IonLabel>All Rooms</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="active">
            <IonLabel>Active Rooms</IonLabel>
          </IonSegmentButton>
        </IonSegment>

                  <div className="space-y-4">
                    <p className='text-black text-xl'>
                      Room Sales
                    </p>
                    {events.map((event, index) => (
                      <ScheduleCard key={index} title={event.title} time={event.time} />
                    ))}
                  </div>
    </div>
  );
};

export default Room;
