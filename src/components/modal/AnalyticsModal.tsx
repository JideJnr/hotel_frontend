// SearchModal.tsx
import React, { useEffect, useState } from "react";
import {
  IonModal,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import { FormDatePicker, FormMultiSelect, FormHeader } from "../forms"; 
import { useAnalytics } from "../../contexts/data/AnalyticsContext";
import { useStaff } from "../../contexts/data/StaffContext";

interface Option {
  value: string | number;
  label: string;
}



const AnalyticsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const router = useIonRouter();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selected, setSelected] = useState<Option[]>([]);

  const { fetchOverview, loading } = useAnalytics();

   const { fetchStaffs, staffs } = useStaff();
    
    useEffect(() => {
      fetchStaffs()
    }, []);

  const handleSearch = async () => {
    // Extract only the values from selected options
    const categoryValues = selected.map(opt => String(opt.value));
    
    const payload = {
      startDate,
      endDate,
      categories: categoryValues.join(",") // Convert array to comma-separated string
    };
    
    const response = await fetchOverview(payload);
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

  const options = [
  { value: "all", label: "All" },
    ...staffs.map((staff) => ({
      value: staff.id,
      label: staff.name,
    })),
  ];

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleCloseModal}>
      <div className="bg-gray-50 min-h-screen flex flex-col ">
        <FormHeader className="mb-4 bg-white rounded-lg" />

        <div className="w-full max-w-2xl mx-auto">
          <div className="px-6 py-6 space-y-5 text-gray-800">
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
                placeholder="Choose Filters…"
              />
            </div>
            

            

            <div className="flex justify-end gap-3 pt-2 border-t mt-2">
              <IonButton size="small" color="medium" onClick={handleClose}>
                Close
              </IonButton>
              <IonButton
                size="small"
                color="primary"
                onClick={handleSearch}
                disabled={loading || !startDate || !endDate}
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