// SearchModal.tsx
import React, { useEffect, useState } from "react";
import {
  IonModal,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import { FormDatePicker, FormMultiSelect, FormHeader } from "../forms"; 
import { useRoom } from "../../contexts/data/RoomContext";
import { useBooking } from "../../contexts/data/BookingContext";
import { useCustomer } from "../../contexts/data/CustomerContext";

// Option type used by FormMultiSelect
interface Option {
  value: string | number;
  label: string;
}


const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const router = useIonRouter();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<any>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>([]);

  const { fetchBookingsByFilter , loading } = useBooking();
  const { fetchRooms, rooms } = useRoom();
  const { fetchCustomers, customers } = useCustomer();
  
  useEffect(() => {
    fetchRooms();
    fetchCustomers();
  }, []);


const handleSearch = async () => {
  let roomValues: string[] = [];
  let customerValues: string[] = [];

  if (selectedRoom.length > 0 && !selectedRoom.some((opt: Option) => opt.value === "all")) {
    roomValues = selectedRoom.map((opt: Option) => String(opt.value));
  }

    if (selectedCustomer.length > 0 && !selectedCustomer.some((opt: Option) => opt.value === "all")) {
    customerValues = selectedCustomer.map((opt: Option) => String(opt.value));
  }

  const response = await fetchBookingsByFilter(
    startDate,
    endDate,
    roomValues.length > 0 ? roomValues.join(",") : undefined ,
    customerValues.length > 0 ? roomValues.join(",") : undefined 
  );

  if (response?.success) {
    onClose();
  }
};

  const handleClose = () => {
    router.goBack();
  };

  const handleCloseModal = () => {
    onClose();
    
  };

  const roomOptions = [
  { value: "all", label: "All" },
    ...rooms.map((room) => ({
      value: room.id,
      label: `ROOM ${room.name}`,
    })),
  ];

    const customerOptions = [
  { value: "all", label: "All" },
    ...rooms.map((room) => ({
      value: room.id,
      label: `ROOM ${room.name}`,
    })),
  ];

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleCloseModal}>
      <div className="bg-gray-50 min-h-screen flex flex-col ">
        {/* Form header (back button) */}
        <FormHeader className="mb-4 bg-white rounded-lg" />

        {/* Card */}
        <div className="w-full max-w-2xl mx-auto">
          {/* Body */}
          <div className="px-6 py-6 space-y-5 text-gray-800">
            {/* Date filters */}
            <div className="grid grid-cols-2 gap-3">
              <FormDatePicker
                label="Start date"
                value={startDate}
                onChange={(v) => setStartDate(v)}
                minDate=""
                maxDate=""
              />
              <FormDatePicker
                label="End date"
                value={endDate}
                onChange={(v) => setEndDate(v)}
                minDate={startDate || ""}
                maxDate=""
              />
            </div>

            {/* Category / Tag filters */}
            <div>
            <FormMultiSelect
              label=""
              name="room"
              value={selectedRoom}
              onChange={(s) => {
                if (s.some((opt) => opt.value === "all")) {
                  // If "All" is selected, keep only All
                  setSelectedRoom([{ value: "all", label: "All" }]);
                } else {
                  // If user picks something else while All was selected, remove All
                  const filtered = s.filter((opt) => opt.value !== "all");
                  setSelectedRoom(filtered);
                }
              }}
              options={roomOptions}
              placeholder="Filter By Room"
            />


            </div>

                        {/* Category / Tag filters */}
            <div>
              <FormMultiSelect
                label=""
                name="customer"
                value={selectedCustomer}
                onChange={(s) => {
                  if (s.some((opt) => opt.value === "all")) {
                    // If "All" is selected, keep only All
                    setSelectedCustomer([{ value: "all", label: "All" }]);
                  } else {
                    // If user picks something else while All was selected, remove All
                    const filtered = s.filter((opt) => opt.value !== "all");
                    setSelectedCustomer(filtered);
                  }
                }}
                options={customerOptions}
                placeholder="Filter By Customer"
              />
            </div>


            {/* Footer */}
            <div className="flex justify-end gap-3 pt-2 border-t mt-2">
              <IonButton size="small" color="medium" onClick={handleClose}>
                Close
              </IonButton>
              <IonButton
                size="small"
                color="primary"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </IonButton>
            </div>
          </div>
        </div>
      </div>
    </IonModal>
  );
};

export default BookingModal;
