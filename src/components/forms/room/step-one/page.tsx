import { IonPage, useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import {
  BackFormContainer,
  FormHeader,
  FormInput,
  FormTextarea,
  FormMultiSelect,
} from "../../../../components/forms";
import Button from "../../../../components/button/button";
import Footer from "../../../footer/footer";
import { RoomFormData } from "../step-two/page";
import { useRoom } from "../../../../contexts/data/RoomContext";
import LoadingPage from "../../../loading/Loading";

export default function CreateRoomForm() {
  const { id } = useParams<{ id: string }>();
  const { fetchRoom, currentRoom:room, loading } = useRoom();
  const router = useIonRouter();

    // Fetch room if editing
  useEffect(() => {
    if (id) {
      fetchRoom(id);
    }
  }, [id]);

  const [formData, setFormData] = useState<RoomFormData>({
     name: room.name || "",
        description: room.description || "",
        capacity: room.capacity || null,
        amenities: room.amenity || [],
        pricePerNight: room.pricePerNight || null,
        oneHour: room.priceOneHour || null,
        twoHours: room.priceTwoHours || null,
  });





  const [errors, setErrors] = useState<Partial<Record<keyof RoomFormData, string>>>({});

  const amenitiesOptions = [
    { value: "WiFi", label: "WiFi" },
    { value: "TV", label: "Television" },
    { value: "AC", label: "Air Conditioning" },
 
  ];

  const validateForm = () => {
    const errs: Partial<Record<keyof RoomFormData, string>> = {};
    if (!formData.name.trim()) errs.name = "Room name is required";
    if (!formData.capacity) errs.capacity = "Capacity is required";
    if (!formData.pricePerNight) errs.pricePerNight = "Price per night is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    sessionStorage.setItem("roomData", JSON.stringify(formData));
    router.push("/register/room/steptwo", "forward", "push");
  };

  return (
    <IonPage>
      {loading && <LoadingPage  />}
      <FormHeader />
      <BackFormContainer
        title="Create Room"
        subtitle="Fill in the room details"
        className="max-w-2xl"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          <FormInput
            label="Room Name *"
            placeholder="Room Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData((fd) => ({ ...fd, name: e.target.value }))}
            error={errors.name}
            required
          />

          <FormTextarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData((fd) => ({ ...fd, description: e.target.value }))}
            placeholder="Optional description of the room"
            rows={3}
          />

          <FormInput
            label="Capacity *"
            type="number"
            name="Capacity"
            placeholder="capacity"
            value={formData.capacity ?? ""}
            onChange={(e) => setFormData((fd) => ({ ...fd, capacity: Number(e.target.value) }))}
            error={errors.capacity}
            required
          />

          <FormInput
            label="Price Per Night (₦) *"
            type="number"
            name="pricePerNight"
            placeholder="Price Per Night (₦) *"
            value={formData.pricePerNight ?? ""}
            onChange={(e) =>
              setFormData((fd) => ({ ...fd, pricePerNight: Number(e.target.value) }))
            }
            error={errors.pricePerNight}
            required
          />

          
          <FormInput
            label="Price - 1 Hour (₦) *"
            type="number"
            name="oneHour"
            placeholder="Price - 1 Hour (₦) *"
            value={formData.oneHour ?? ""}
            onChange={(e) =>
              setFormData((fd) => ({ ...fd, oneHour: Number(e.target.value) }))
            }
            error={errors.pricePerNight}
            required
          />

          
          <FormInput
            label="Price - 2 Hours (₦) *"
            type="number"
            placeholder="Price - 2 Hours (₦) *"
            name="twoHours"
            value={formData.twoHours ?? ""}
            onChange={(e) =>
              setFormData((fd) => ({ ...fd, twoHours: Number(e.target.value) }))
            }
            error={errors.pricePerNight}
            required
          />

          <FormMultiSelect
            label="Amenities"
            name="amenities"
            value={formData.amenities.map((a) => ({ value: a, label: a }))}
            onChange={(opts) =>
              setFormData((fd) => ({
                ...fd,
                amenities: opts.map((o) => String(o.value))
              }))
            }
            options={amenitiesOptions}
          />


          <div className="pt-4">
            <Button text="Create Room" type="submit" className="w-full" />
          </div>
        </form>
        <Footer/>
      </BackFormContainer>
    </IonPage>
  );
}
