import { IonContent } from "@ionic/react";
import Taskbar from "../../components/layout/taskbar/Taskbar";
import Message from "./message/Message";
import { MessageProvider } from "../../context/messageContext";

const Support = () => {
  return (
    <MessageProvider>
      <IonContent>
        <Taskbar>
          <Message />
        </Taskbar>
      </IonContent>
    </MessageProvider>
  );
};

export default Support;
