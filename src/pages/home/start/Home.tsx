import {

  IonPage,
  IonContent,
  IonRefresherContent,
  IonRefresher,
} from "@ionic/react";
import Room from "../../room/Room";
import Activity from "../../activity/Activity";
import Header from "../../../components/layout/header/Header";
import Home from "../Home";
import Setting from "../../settings/Settings";
import { useDataContext } from "../../../context/dataContext";
import Users from "../../users/Users";
import Customer from "../customer/customer";
import { useState } from "react";
import { Tab, TabGroup } from "@headlessui/react";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Start() {
  const { reloadData, user } = useDataContext();
  const [data, setModal] = useState({});

  const refresh = (e: CustomEvent) => {
    try {
      reloadData();
      e.detail.complete();
    } catch (err) {
      console.error("Refresh error:", err);
      e.detail.complete();
    }
  };

  const renderTabs = () => (
    <Tab.Panels className="h-full mx-auto flex flex-1 overflow-y-auto shadow-t-xl">
      <Tab.Panel className="w-full h-full flex overflow-x-none overflow-y-auto">
         <Home formData={data} />
      </Tab.Panel>
      <Tab.Panel className="w-full h-full flex overflow-x-none overflow-y-auto">
        <Room formData={data} />
      </Tab.Panel>
      <Tab.Panel className="w-full h-full flex overflow-x-none overflow-y-auto">
        <Users formData={data} />
      </Tab.Panel>
      <Tab.Panel className="w-full h-full flex overflow-x-none overflow-y-auto">
        <Activity />
      </Tab.Panel>
      <Tab.Panel className="w-full h-full flex overflow-x-none overflow-y-auto">
        <Setting setFormData={setModal} />
      </Tab.Panel>
    </Tab.Panels>
  );

  const renderTabList = () => (
    <Tab.List className="h-16  px-5 py-3 grid grid-cols-auto grid-flow-col w-full mt-auto bg-gray-200">
      {["HM", "RM", "CS", "AC", 'SS'].map((label) => (
        <Tab
          key={label}
          className={({ selected }) =>
            classNames(
              "w-full text-sm font-medium rounded-lg mx-2 p-3",
              "focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60",
              selected ? "bg-white shadow-xl text-blue-700" : "hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          <div className="flex mx-auto my-auto w-fit">{label}</div>
        </Tab>
      ))}
    </Tab.List>
  );

  return (
    <IonPage >
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>
        <Header>
          <TabGroup as='div' className=' grid grid-cols-1 grid-rows-12 h-full w-full '>
            <div className="col-span-1 row-span-11">
            {renderTabs()}
            </div>
            <div className="col-span-1 row-span-1">
            {renderTabList()}
</div>
          
          
          </TabGroup>
        </Header>
      </IonContent>
    </IonPage>
  );
}

export default Start;
