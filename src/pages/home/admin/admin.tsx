import { IonContent, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { useState } from "react";
import Header from "../../../components/layout/header/Header";

interface FormProps {
  formData?: any;
  setFormData: (updatedFormData: any) => void;
  setModal: (updatedFormData: any) => void;
}

const Admin = ({ setFormData, setModal, formData }: FormProps) => {
  const [groups] = useState([
    { label: "All Hotel", value: "all", image: "/path/to/image1.jpg" },
    { label: "Ijebu", value: "ijebu", image: "/path/to/image2.jpg" },
    { label: "Lagos", value: "lagos", image: "/path/to/image2.jpg" },
  ]);

  return (
    <Header>
      <div className="p-4 flex flex-col space-y-4">
        {groups.map((group, i) => (
          <div
            key={i}
            onClick={() => {
              setModal(false);
              setFormData(group);
            }}
            className="rounded-lg shadow-sm min-h-[162px] flex flex-col-reverse"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(41, 9, 202, 0.4), rgba(41, 9, 202, 0.4)), url(${group.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <IonCardHeader className="text-white">
              <IonCardTitle className="text-2xl font-bold tracking-tight text-white">
                {group.label}
              </IonCardTitle>
            </IonCardHeader>
          </div>
        ))}
      </div>
    </Header>
  );
};

export default Admin;
