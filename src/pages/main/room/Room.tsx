import { IonContent, IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { useState } from "react";
import GenericList from "../../../components/cards/GenericList";

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

  const filteredRooms = activeTab === "active" 
    ? mockRooms.filter((room) => room.isActive)
    : mockRooms;

  // Convert rooms to GenericList items
  const roomItems = filteredRooms.map((room) => ({
    id: room.id,
    name: room.name,
    value: room.price,
    type: room.isActive ? 'active' : 'inactive',
  }));

  return (
    <IonContent>
      <div className="p-4 dark:bg-gray-100 min-h-screen">
        {/* Tab selector */}
        <IonSegment 
          value={activeTab}
          onIonChange={(e) => setActiveTab(e.detail.value as "all" | "active")}
          className="mb-6"
        >
          <IonSegmentButton value="all">
            <IonLabel>All Rooms</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="active">
            <IonLabel>Active Rooms</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Room list using GenericList */}
        <GenericList
          items={roomItems}
          title={activeTab === "active" ? "Active Rooms" : "All Rooms"}
          valuePrefix="₦"
          showTypeLabel={true}
          showTime={false}
        />
      </div>
    </IonContent>
  );
};

export default Room;