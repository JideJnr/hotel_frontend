import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonPage,
  IonContent,
  IonRefresherContent,
  IonRefresher,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import { playCircle, radio, search, settings } from "ionicons/icons";
import Room from "../../room/Room";
import Activity from "../../activity/Activity";
import Header from "../../../components/layout/header/Header";
import Home from "../Home";
import Setting from "../../settings/Settings";
import { FormProps } from "../../register/customer/StepOne";
import { useDataContext } from "../../../context/dataContext";
import Users from "../../users/Users";
import Customer from "../customer/customer";
import { useState } from "react";

function Start() {
  const { reloadData, user } = useDataContext();
  
  const refresh = (e: CustomEvent) => {
    reloadData();
    e.detail.complete();
  };

  const [data, setModal] = useState({});

  return (
    <IonPage id="home-page">

      
          <IonContent fullscreen>
            <IonRefresher slot="fixed" onIonRefresh={refresh}>
              <IonRefresherContent />
            </IonRefresher>
    
    
            <Header>
              <IonReactRouter>
                <IonTabs>
                  <IonRouterOutlet>
                  <Redirect exact path="/main" to="/main/home" />
    
                    <Route
                      path="/main/home"
                      render={() => (
                        <>
                          {user && user?.role === "costumer" ? (
                            <Customer />
                          ) : (
                            <Home formData={data} />
                            
                          
                          )}
                        </>
                      )}
                      exact
                    />
    
                    <Route
                      path="/main/room"
                      render={() => <Room formData={data} />}
                      exact
                    />
    
                    <Route
                      path="/main/user"
                      render={() => <Users formData={data} />}
                      exact
                    />
    
                    <Route
                      path="/main/activity"
                      render={() => <Activity formData={data} />}
                      exact
                    />
                    <Route
                      path="/main/settings"
                      render={() => <Setting setFormData={setModal} />}
                      exact
                    />
                  </IonRouterOutlet>
                  <IonTabBar slot="bottom">
                    <IonTabButton tab="home" href="/main/home">
                      <IonIcon icon={playCircle} />
                      <IonLabel>Home</IonLabel>
                    </IonTabButton>
    
                    <IonTabButton tab="room" href="/main/room">
                      <IonIcon icon={radio} />
                      <IonLabel>Room</IonLabel>
                    </IonTabButton>
    
                    {user && user?.role === "admin" && (
                      <IonTabButton tab="user" href="/main/user">
                        <IonIcon icon={radio} />
                        <IonLabel>Users</IonLabel>
                      </IonTabButton>
                    )}
    
                    <IonTabButton tab="activity" href="/main/activity">
                      <IonIcon icon={search} />
                      <IonLabel>Activities</IonLabel>
                    </IonTabButton>
    
                    <IonTabButton tab="settings" href="/main/settings">
                      <IonIcon icon={settings} />
                      <IonLabel>Settings</IonLabel>
                    </IonTabButton>
                  </IonTabBar>
                </IonTabs>
              </IonReactRouter>
            </Header>
          </IonContent>
 
  

    </IonPage>
  );
}

export default Start;
