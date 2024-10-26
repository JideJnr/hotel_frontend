import { IonItem, IonLabel, IonNote } from "@ionic/react";
import { Message } from "../data/messages";
import "./MessageListItem.css";

interface MessageListItemProps {
  message: Message;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  return (
    <IonItem routerLink={`/message/${message.id}`} detail={false}>
      <div slot="" className=" mx-4 ">
        <img
          src="https://via.placeholder.com/50"
          alt="Passport"
          style={{ width: "35px", height: "35px", borderRadius: "50%" }}
        />
      </div>
      <IonLabel className="ion-text-wrap  gap-4">
        <h2>
          {message.name}
          <span className="date">
            <IonNote>{message.date}</IonNote>
          </span>
        </h2>

        <h3>{message.phone}</h3>
      </IonLabel>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5 ml-auto mr-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </IonItem>
  );
};

export default MessageListItem;
