import { IonContent } from "@ionic/react";

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
  const activeRooms = mockRooms.filter((room) => room.isActive);
  const inactiveRooms = mockRooms.filter((room) => !room.isActive);

  return (
    <IonContent>
      <div className="p-4 dark:bg-gray-100 min-h-screen">
        <h2 className="text-xl font-bold mb-2">Active Rooms</h2>
        {activeRooms.length > 0 ? (
          activeRooms.map((room) => (
            <div key={room.id} className="p-3 mb-2 bg-white rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg text-black">{room.name}</p>
                  <p className="text-sm text-green-600">Active</p>
                </div>
                <p className="text-sm text-gray-600">₦{room.price.toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No active rooms</p>
        )}

        <h2 className="text-xl font-bold mt-6 mb-2">All Other Rooms</h2>
        {inactiveRooms.length > 0 ? (
          inactiveRooms.map((room) => (
            <div key={room.id} className="p-3 mb-2 bg-white rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{room.name}</p>
                  <p className="text-sm text-red-500">Inactive</p>
                </div>
                <p className="text-sm text-gray-600">₦{room.price.toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No other rooms</p>
        )}
      </div>
    </IonContent>
  );
};

export default Room;
