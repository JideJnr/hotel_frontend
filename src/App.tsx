import React, { Suspense }  from "react";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Routes from "./routes/Routes";


import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import Loading from "./components/loading/Loading";


setupIonicReact();

const App: React.FC = () => {
  return (
       <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Routes />
          </Suspense>
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
