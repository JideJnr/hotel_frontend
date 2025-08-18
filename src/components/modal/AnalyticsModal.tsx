// SearchModal.tsx
import React, { useState } from "react";
import {
  IonModal,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import { FormDatePicker, FormMultiSelect, FormHeader } from "../forms"; 
import { useAnalytics } from "../../contexts/data/AnalyticsContext"; // adjust path

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

const AnalyticsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const router = useIonRouter();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selected, setSelected] = useState<Option[]>([]);

  const { fetchOverview, loading } = useAnalytics(); // get context fn + loading

  const handleSearch = async () => {
    const response = await fetchOverview({
      startDate,
      endDate,
      category: selected
    });
    if (response.success) {
      onClose();
    }
    
  };

  const handleClose = () => {
      router.goBack();
  };

    const handleCloseModal = () => {
    onClose();
    
  };

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
                name="tags"
                value={selected}
                onChange={(s) => setSelected(s)}
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

export default AnalyticsModal;
