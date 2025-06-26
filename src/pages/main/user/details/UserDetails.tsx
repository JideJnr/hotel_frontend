import { useParams } from "react-router-dom";
import { IonContent } from "@ionic/react";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <IonContent>
      <div className="p-4">
        <h2 className="text-xl font-bold">User Details Page</h2>
        <p className="mt-2 text-gray-700">Selected User ID: <strong>{id}</strong></p>
      </div>
    </IonContent>
  );
};

export default UserDetails;
