// SearchModal.tsx
import React, { useEffect, useState } from "react";
import {
  IonModal,
  IonButton,
} from "@ionic/react";
import { FormDatePicker, FormMultiSelect, FormHeader } from "../forms"; 
import { useAnalytics } from "../../contexts/data/AnalyticsContext"; // adjust path
import { useRoom } from "../../contexts/data/RoomContext";

// Option type used by FormMultiSelect
interface Option {
  value: string | number;
  label: string;
}

const options: Option[] = [
  { value: "sales", label: "Sales" },
  { value: "customers", label: "Customers" },
  { value: "expenses", label: "Expenses" },
  { value: "bookings", label: "Bookings" },
];

const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selected, setSelected] = useState<Option[]>([]);

  const { fetchOverview, loading } = useAnalytics();
  const { fetchRooms, rooms } = useRoom();
  
  useEffect(() => {
    fetchRooms()
  }, []);


  const handleSearch = async () => {
    await fetchOverview({
      startDate,
      endDate,
      category: selected.find((s) => s.value === "expenses")?.value as string, 
      roomType: undefined, // you can extend this later if needed
    });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const options = [
  { value: "all", label: "All" },
    ...rooms.map((room) => ({
      value: room.id,
      label: `ROOM ${room.name}`,
    })),
  ];

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
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
  name="tags"
  value={selected}
  onChange={(s) => {
    if (s.some((opt) => opt.value === "all")) {
      // If "All" is selected, keep only All
      setSelected([{ value: "all", label: "All" }]);
    } else {
      // If user picks something else while All was selected, remove All
      const filtered = s.filter((opt) => opt.value !== "all");
      setSelected(filtered);
    }
  }}
  options={options}
  placeholder="Choose tags…"
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
