import OnboardingTemplate from "../../../../components/templates/onboarding/onboarding";
import { useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/button/button";

type FormData = {
  customer: {
    value: number;
    label: string;
  } | null;
  roomNumber: {
    value: number;
    label: string;
  } | null;
  bookingInstruction: string;
};

type ClientDetails = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
};

type RoomDetails = {
  id: number;
  type?: string;
  price?: number;
  status?: string;
};

const SalesStepTwo = () => {
  const router = useIonRouter();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [clientDetails, setClientDetails] = useState<ClientDetails | null>(null);
  const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Retrieve data from session storage
    const storedData = sessionStorage.getItem("coreDetails");
    if (storedData) {
      const parsedData: FormData = JSON.parse(storedData);
      setFormData(parsedData);

      // In a real app, you would fetch these details from your API
      if (parsedData.customer?.value) {
        // Mock client details fetch
        setClientDetails({
          id: parsedData.customer.value,
          name: parsedData.customer.label || "Unknown",
          email: "client@example.com",
          phone: "+1234567890",
        });
      }

      if (parsedData.roomNumber?.value) {
        // Mock room details fetch
        setRoomDetails({
          id: parsedData.roomNumber.value,
          type: "Deluxe",
          price: 150,
          status: "Available",
        });
      }
    } else {
      toast.error("No booking data found");
      router.push("/register/sales/stepone");
    }
  }, [router]);

  const handleSubmit = async () => {
    if (!formData) return;

    setIsSubmitting(true);
    try {
      // In a real app, this would be your API call
      // await api.post('/bookings', {
      //   clientId: formData.customer?.value,
      //   roomId: formData.roomNumber?.value,
      //   instructions: formData.bookingInstruction,
      // });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Booking created successfully!");
      sessionStorage.removeItem("coreDetails");
      router.push("/bookings/success", "forward", "replace");
    } catch (error) {
      toast.error("Failed to create booking");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push("/register/sales/stepone", "back", "replace");
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <OnboardingTemplate titleOne="Review your booking">
      <div className="flex flex-col gap-6 bg-white h-fit p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Booking Summary</h2>
          
          <div className="border-t border-b border-gray-200 py-4">
            <h3 className="font-medium text-gray-700">Client Information</h3>
            {clientDetails ? (
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Name:</span> {clientDetails.name}</p>
                <p><span className="font-medium">Email:</span> {clientDetails.email}</p>
                <p><span className="font-medium">Phone:</span> {clientDetails.phone}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No client selected</p>
            )}
          </div>

          <div className="border-b border-gray-200 py-4">
            <h3 className="font-medium text-gray-700">Room Information</h3>
            {roomDetails ? (
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Room:</span> {formData.roomNumber?.label}</p>
                <p><span className="font-medium">Type:</span> {roomDetails.type}</p>
                <p><span className="font-medium">Price:</span> ${roomDetails.price}/night</p>
                <p><span className="font-medium">Status:</span> {roomDetails.status}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No room selected</p>
            )}
          </div>

          {formData.bookingInstruction && (
            <div className="border-b border-gray-200 py-4">
              <h3 className="font-medium text-gray-700">Special Instructions</h3>
              <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">
                {formData.bookingInstruction}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Button 
            onClick={handleBack}
            text="Back"
            variant="outline"
            className="w-32"
          />
          <Button 
            onClick={handleSubmit}
            text={isSubmitting ? "Processing..." : "Confirm Booking"}
            disabled={isSubmitting}
            className="w-32"
          />
        </div>
      </div>
    </OnboardingTemplate>
  );
};

export default SalesStepTwo;