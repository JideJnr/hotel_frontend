// SearchModal.tsx
import React, { useState } from "react";
import {
  IonModal,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import { FormDatePicker, FormMultiSelect, FormHeader, FileUpload, FormTextarea } from "../forms"; 
import { useCustomer } from "../../contexts/data/CustomerContext";
import { useRoom } from "../../contexts/data/RoomContext";

const options: Option[] = [
  { value: "personal", label: "Personal" },
  { value: "staff", label: "Staff" },
  { value: "maintainance", label: "Maintainance" },
  { value: "client", label: "Client" },
];

const IssueModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const router = useIonRouter();
  const [selected, setSelected] = useState<Option[]>([]);

    const { fetchCustomers , customers } = useCustomer();
    const { fetchRooms , rooms } = useRoom();
    

  const [formData, setFormData] = useState({
    amount: '',
    category: null as { value: string; label: string } | null,
    description: '',
    date: new Date().toISOString().split('T')[0],
    receiptBase64: '', // Add base64 field
  });

    const [errors, setErrors] = useState({
    amount: '',
    category: '',
    description: '',
    date: '',
  });


  const handleSearch = async () => {
    // Extract only the values from selected options
    const categoryValues = selected.map(opt => String(opt.value));
    
    const payload = {
      categories: categoryValues.join(",") // Convert array to comma-separated string
    };
        onClose();
  };

  const handleClose = () => {
    router.goBack();
  };

  const handleCloseModal = () => {
    onClose();
  };

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // File to base64 handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, receiptBase64: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleCloseModal}>
      <div className="bg-gray-50 min-h-screen flex flex-col ">
        <FormHeader className="mb-4 bg-white rounded-lg" />

        <div className="w-full h-full overflow-y-auto max-w-2xl mx-auto px-6 py-6 space-y-5 text-gray-800">
       

            <FormMultiSelect
  label="Category"
  name="tags"
  value={selected}
  onChange={(s) => setSelected(s)}
  options={options}
  placeholder="Choose tags…"
/>

{/* If Staff is selected, show staff selection */}
{selected.some(opt => opt.value === "staff") && (
  <div className="mt-4">
    <label className="block text-sm font-medium text-gray-700">Select Staff</label>
    <FormMultiSelect
      label=""
      name="staff"
      value={formData.staff || []}
      onChange={(s) => setFormData(prev => ({ ...prev, staff: s }))}
      options={customers
        .filter(c => c.type === "staff") // assuming you tag customers
        .map(c => ({ value: c.id, label: c.name }))}
      placeholder="Choose staff…"
    />
  </div>
)}

{/* If Client is selected, show client selection */}
{selected.some(opt => opt.value === "client") && (
  <div className="mt-4">
    <label className="block text-sm font-medium text-gray-700">Select Clients</label>
    <FormMultiSelect
      label=""
      name="clients"
      value={formData.clients || []}
      onChange={(s) => setFormData(prev => ({ ...prev, clients: s }))}
      options={customers
        .filter(c => c.type === "client")
        .map(c => ({ value: c.id, label: c.name }))}
      placeholder="Choose clients…"
    />
  </div>
)}

{/* If Maintenance is selected, show room selection */}
{selected.some(opt => opt.value === "maintainance") && (
  <div className="mt-4">
    <label className="block text-sm font-medium text-gray-700">Select Room</label>
    <FormMultiSelect
      label=""
      name="rooms"
      value={formData.rooms || []}
      onChange={(s) => setFormData(prev => ({ ...prev, rooms: s }))}
      options={rooms.map(r => ({ value: r.id, label: r.name }))}
      placeholder="Choose rooms…"
    />
  </div>
)}


            
                      <FormTextarea
                        label="Description *"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="What was this issue all about?"
                        rows={5}
                        error={errors.description}
                        required
                      />
            
            
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Receipt (Optional)
                        </label>
                        <FileUpload
                          accept=".jpg,.jpeg,.png,.pdf"
                          maxSize={5}
                          onChange={handleFileChange}
                          preview={formData.receiptBase64}
                          onRemove={() => setFormData(fd => ({ ...fd, receiptBase64: '' }))}
                        />
                      
                      </div>
            
                    

            <div className="flex justify-end gap-3 pt-2 border-t mt-2">
              <IonButton size="small" color="medium" onClick={handleCloseModal}>
                Close
              </IonButton>
              <IonButton
                size="small"
                color="primary"
                onClick={handleSearch}
              
              >
              Search
              </IonButton>
            </div>
        
        </div>
      </div>
    </IonModal>
  );
};

export default IssueModal;