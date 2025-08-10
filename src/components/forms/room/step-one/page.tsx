import { IonPage } from "@ionic/react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  BackFormContainer,
  FormHeader,
  FormInput,
  FormTextarea
} from "../../../../components/forms";
import Button from "../../../../components/button/button";

import FormSelect from "../../FormSelect";

interface RoomFormData {
  name: string;
  description: string;
  capacity: number | null;
  amenities: string[];
  pricePerNight: number | null;
  isAvailable: boolean;
}

export default function CreateRoomForm() {
  const [formData, setFormData] = useState<RoomFormData>({
    name: "",
    description: "",
    capacity: null,
    amenities: [],
    pricePerNight: null,
    isAvailable: true
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RoomFormData, string>>>({});

  const amenitiesOptions = [
    { value: "WiFi", label: "WiFi" },
    { value: "TV", label: "Television" },
    { value: "AC", label: "Air Conditioning" },
    { value: "Parking", label: "Parking" }
  ];

  const validateForm = () => {
    const errs: Partial<Record<keyof RoomFormData, string>> = {};

    if (!formData.name.trim()) errs.name = "Room name is required";
    if (!formData.capacity) errs.capacity = "Capacity is required";
    if (!formData.pricePerNight) errs.pricePerNight = "Price per night is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Room created successfully!");
        setFormData({
          name: "",
          description: "",
          capacity: null,
          amenities: [],
          pricePerNight: null,
          isAvailable: true
        });
      } else {
        toast.error(data.errors ? data.errors.join(", ") : data.error || "Failed to create room");
      }
    } catch (error) {
      toast.error("An error occurred while creating the room");
    }
  };

  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer
        title="Create Room"
        subtitle="Fill in the room details"
        className="max-w-2xl"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
          <FormInput
            label="Room Name *"
            placeholder="Room Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData(fd => ({ ...fd, name: e.target.value }))}
            error={errors.name}
            required
          />

          <FormTextarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData(fd => ({ ...fd, description: e.target.value }))}
            placeholder="Optional description of the room"
            rows={3}
          />

          <FormInput
            label="Capacity *"
            type="number"
            name="capacity"
            value={formData.capacity ?? ""}
            onChange={(e) => setFormData(fd => ({ ...fd, capacity: Number(e.target.value) }))}
            error={errors.capacity}
            required
          />

          <FormInput
            label="Price Per Night (₦) *"
            type="number"
            name="pricePerNight"
            value={formData.pricePerNight ?? ""}
            onChange={(e) => setFormData(fd => ({ ...fd, pricePerNight: Number(e.target.value) }))}
            error={errors.pricePerNight}
            required
          />

          <FormSelect
            label="Amenities"
            name="amenities"
            value={formData.amenities.map(a => ({ value: a, label: a }))}
            onChange={opts => setFormData(fd => ({
              ...fd,
              amenities: opts ? opts.map(o => o.value) : []
            }))}
            options={amenitiesOptions}
            isMulti
          />

          <FormSelect
            label="Availability"
            name="isAvailable"
            value={formData.isAvailable
              ? { value: "true", label: "Available" }
              : { value: "false", label: "Not Available" }
            }
            onChange={opt => setFormData(fd => ({
              ...fd,
              isAvailable: opt?.value === "true"
            }))}
            options={[
              { value: "true", label: "Available" },
              { value: "false", label: "Not Available" }
            ]}
          />

          <div className="pt-4">
            <Button text="Create Room" type="submit" className="w-full" />
          </div>
        </form>
      </BackFormContainer>
    </IonPage>
  );
}
