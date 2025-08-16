import { IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import Button from "../../../../components/button/button";
import { useRoom } from "../../../../contexts/data/RoomContext";


interface RoomFormData {
  name: string;
  description: string;
  capacity: number | null;
  amenities: string[];
  pricePerNight: number | null;
  isAvailable: boolean;
}

const RoomStepTwo = () => {
  const router = useIonRouter();
  const { createRoom } = useRoom();

  const [formData, setFormData] = useState<RoomFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem("roomData");
    if (!storedData) {
      toast.error("No room data found. Please start over.");
      router.push("/register/room/stepone", "back", "push");
      return;
    }
    try {
      const parsed: RoomFormData = JSON.parse(storedData);
      if (!parsed.name || !parsed.capacity || !parsed.pricePerNight) {
        throw new Error();
      }
      setFormData(parsed);
    } catch {
      toast.error("Invalid room data format.");
      router.push("/register/room/stepone", "back", "push");
    }
  }, [router]);

  const handleSubmit = async () => {
    if (!formData) return;

    try {
      await createRoom(formData);

    } catch (err: any) {

    } finally {
  
    }
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading room data...</p>
      </div>
    );
  }

  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer
        title="Review Room Details"
        subtitle="Please review the information before submitting"
        className="max-w-md"
      >
        <div className="space-y-6">
          <DetailRow label="Room Name" value={formData.name} />
          <DetailRow label="Description" value={formData.description || "N/A"} />
          <DetailRow label="Capacity" value={String(formData.capacity)} />
          <DetailRow label="Price Per Night (₦)" value={String(formData.pricePerNight)} />
          <DetailRow label="Amenities" value={formData.amenities.join(", ") || "None"} />
          <DetailRow label="Availability" value={formData.isAvailable ? "Available" : "Not Available"} />

          <div className="flex flex-col gap-3 pt-4">
            <Button
              text="Submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              loading={isSubmitting}
              loadingText="Submitting..."
              className="w-full"
            />
          </div>
        </div>
      </BackFormContainer>
    </IonPage>
  );
};

export default RoomStepTwo;
