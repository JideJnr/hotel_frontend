import React, { useState, useEffect, useRef } from "react";
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
  useIonRouter,
  IonSpinner
} from "@ionic/react";
import { search, close } from "ionicons/icons";

interface User {
  id: number;
  name: string;
  email: string;
  // Add other user properties as needed
}

const SearchModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void 
}> = ({
  isOpen,
  onClose,
}) => {
  const router = useIonRouter();
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // API call to search users
  const searchUsers = async (query: string) => {
    try {
      setLoading(true);
      setError("");
      
      // Replace with your actual API endpoint
      const response = await fetch(`https://api.example.com/users?q=${query}`);
      
      if (!response.ok) throw new Error("Failed to fetch users");
      
      const data = await response.json();
      setSearchResults(data.users);
    } catch (err) {
      setError("Error fetching users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search input
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (inputValue.trim().length > 2) {
      debounceRef.current = setTimeout(() => {
        searchUsers(inputValue);
      }, 300);
    } else {
      setSearchResults([]);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [inputValue]);

  const handleClearInput = () => {
    setInputValue("");
    setSearchResults([]);
  };

  const handleUserSelect = (user: User) => {
    onClose();
    router.push(`/user-details/${user.id}`);
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search Users</IonTitle>
          <IonButton slot="end" fill="clear" onClick={onClose}>
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Search Bar */}
        <div className="flex items-center border-2 border-primary rounded-md px-2">
          <IonIcon icon={search} className="text-lg mr-2" />
          <IonInput
            value={inputValue}
            placeholder="Search users..."
            autofocus={true}
            onIonChange={(e) => setInputValue(e.detail.value!)}
          />
          {inputValue && (
            <IonButton 
              fill="clear" 
              size="small" 
              onClick={handleClearInput}
            >
              <IonIcon icon={close} />
            </IonButton>
          )}
        </div>

        {/* Search Results */}
        <div className="mt-4">
          {loading && (
            <div className="flex justify-center py-4">
              <IonSpinner name="crescent" />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center py-2">{error}</div>
          )}

          {!loading && searchResults.length > 0 && (
            <IonList className="mt-3">
              {searchResults.map((user) => (
                <IonItem
                  key={user.id}
                  button
                  onClick={() => handleUserSelect(user)}
                >
                  <IonLabel>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          )}

          {!loading && inputValue.length > 2 && searchResults.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No users found
            </div>
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default SearchModal;