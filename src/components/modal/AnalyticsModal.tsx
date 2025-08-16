// SearchModal.tsx
import React, { useState } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonChip
} from "@ionic/react";
import { search, mic, close, ellipsisVertical } from "ionicons/icons";

interface NavItem {
  id: number;
  title: string;
  path: string;
  icon?: string;
}

interface TagItem {
  id: number;
  class: string;
  icon: string;
}

const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [navData] = useState<NavItem[]>([
    { id: 1, title: "Notifications", path: "/pages/notifications" },
    { id: 2, title: "Alerts", path: "/ui-elements/alerts" },
    { id: 3, title: "Mail", path: "/pages/email/mail-app" },
  ]);
  const [tags, setTags] = useState<TagItem[]>([
    { id: 1, class: "Dashboard", icon: "home" },
    { id: 2, class: "Settings", icon: "settings" },
  ]);

  const handleRemoveTag = (id: number) => {
    setTags(tags.filter((t) => t.id !== id));
    onClose(); // Close modal when tag is removed
  };

  const handleSearch = () => {
    if (inputValue.trim().length > 0) {
      setShowResults(true);
    }
    onClose(); // Close modal after search
  };

  // Close modal for all interactions
  const handleClose = () => {
    setShowResults(false);
    setInputValue("");
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
          {/* ADDED: Close button in header */}
          <IonButton slot="end" fill="clear" onClick={handleClose}>
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="flex items-center border-2 border-primary rounded-md px-2">
          <IonIcon icon={search} className="text-lg mr-2" />
          <IonInput
            value={inputValue}
            placeholder="Search"
            onIonChange={(e) => setInputValue(e.detail.value!)}
            clearInput
          />
          {/* ADDED: Close handlers for icons */}
          <IonIcon 
            icon={mic} 
            className="text-lg ml-2" 
            onClick={handleClose}
          />
          <IonIcon 
            icon={ellipsisVertical} 
            className="text-lg ml-2" 
            onClick={handleClose}
          />
        </div>

        {showResults && (
          <IonList className="mt-3">
            {navData.map((item) => (
              <IonItem
                key={item.id}
                button
                routerLink={item.path}
                // MODIFIED: Close modal when result is selected
                onClick={handleClose}
              >
                <IonLabel>{item.title}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        <div className="mt-4">
          <p className="text-sm text-gray-500">Are you looking for...</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <IonChip key={tag.id}>
                <IonIcon icon={tag.icon as any} />
                <IonLabel>{tag.class}</IonLabel>
                <IonIcon
                  icon={close}
                  onClick={() => handleRemoveTag(tag.id)}
                />
              </IonChip>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm text-gray-500">Recent Search:</p>
          {navData.map((item) => (
            <IonItem key={item.id} onClick={handleClose}>
              <IonLabel>{item.title}</IonLabel>
              <IonIcon icon={close} />
            </IonItem>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-5">
          {/* MODIFIED: Close modal on search */}
          <IonButton size="small" onClick={handleClose}>
            Search
          </IonButton>
          <IonButton
            size="small"
            color="danger"
            onClick={() => setShowResults(false)}
          >
            Clear Recents
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default SearchModal;