import { IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import Button from "../../../../components/button/button";
import { useRoom } from "../../../../contexts/data/RoomContext";
import Footer from "../../../footer/footer";
import { formatNaira } from "../../../../utils/formatNaira";


export interface RoomFormData {
  name: string;
  description: string;
  capacity: number | null;
  amenities: string[];
  pricePerNight: number | null;
  oneHour: number | null;
  twoHours: number | null;
 
}

const RoomStepTwo = () => {
  const router = useIonRouter();
  const { createRoom , loading} = useRoom();

  const [formData, setFormData] = useState<RoomFormData | null>(null);

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
        <div className="space-y-4">
          <DetailRow label="Room Name" value={formData.name} />
          <DetailRow label="Description" value={formData.description || "N/A"} />
          <DetailRow label="Capacity" value={String(formData.capacity)} />
          <DetailRow label="Price Per Night (₦)" value={String(formatNaira(formData.pricePerNight||0))} />
          <DetailRow label="Price One Hour (₦)" value={String(formatNaira(formData.oneHour||0))} />
          <DetailRow label="Price Two Hours (₦)" value={String(formatNaira(formData.twoHours||0))} />
          <DetailRow label="Amenities" value={formData.amenities.join(", ") || "None"} />
        
          <div className=" mt-4">
            <Button
              text="Submit"
              onClick={handleSubmit}
              disabled={loading}
              loading={loading}
              loadingText="Submitting..."
              className="w-full"
            />
          </div>
        </div>
        <Footer/>
      </BackFormContainer>
    </IonPage>
  );
};

export default RoomStepTwo;
