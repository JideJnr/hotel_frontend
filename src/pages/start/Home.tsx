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
import { playCircle, radio, search, settings } from "ionicons/icons"; // Use different icons

import Room from "../room/Room";
import Activity from "../activity/Activity";
import Header from "../home/Header";
import Home from "../home/HomePage";
import Setting from "../settings/Settings";

function Start() {
  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
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
                <Route path="/home" render={() => <Home />} exact />
                <Route path="/room" render={() => <Room />} exact />
                <Route path="/activity" render={() => <Activity />} exact />
                <Route path="/settings" render={() => <Setting />} exact />
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

                <IonTabButton tab="activity" href="/activity">
                  <IonIcon icon={search} />
                  <IonLabel>Activities</IonLabel>
                </IonTabButton>

                <IonTabButton tab="settings" href="/settings">
                  <IonIcon icon={settings} /> {/* Changed to settings icon */}
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
