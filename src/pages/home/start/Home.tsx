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

function Start({ formData: data, setFormData: setModal }: FormProps) {
  const { reloadData, user } = useDataContext();
  const refresh = (e: CustomEvent) => {
    reloadData();
    e.detail.complete();
  };

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
                <Redirect exact path="/" to="/home" />

                <Route
                  path="/home"
                  render={() => (
                    <>
                      {user && user?.role === "customer" ? (
                        <Customer />
                      ) : (
                        <Home formData={data} />
                        
                      
                      )}
                    </>
                  )}
                  exact
                />

                <Route
                  path="/room"
                  render={() => <Room formData={data} />}
                  exact
                />

                <Route
                  path="/user"
                  render={() => <Users formData={data} />}
                  exact
                />

                <Route
                  path="/activity"
                  render={() => <Activity formData={data} />}
                  exact
                />
                <Route
                  path="/settings"
                  render={() => <Setting setFormData={setModal} />}
                  exact
                />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon icon={playCircle} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>

                <IonTabButton tab="room" href="/room">
                  <IonIcon icon={radio} />
                  <IonLabel>Room</IonLabel>
                </IonTabButton>

                {user && user?.role === "admin" && (
                  <IonTabButton tab="user" href="/user">
                    <IonIcon icon={radio} />
                    <IonLabel>Users</IonLabel>
                  </IonTabButton>
                )}

                <IonTabButton tab="activity" href="/activity">
                  <IonIcon icon={search} />
                  <IonLabel>Activities</IonLabel>
                </IonTabButton>

                <IonTabButton tab="settings" href="/settings">
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
