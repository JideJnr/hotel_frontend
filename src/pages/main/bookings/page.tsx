import {  IonPage, useIonRouter } from '@ionic/react';
import ScheduleCard from '../../../components/templates/card/ScheduleCard';
import { FormHeader } from '../../../components/forms';
import DashboardTile from '../../../components/templates/dashboardtiles/DashboardTiles';

const Bookings = () => {
  const router = useIonRouter();

  const record = [
    { customerName: 'Dressage Practice', RoomNumber: 2 },
    { customerName: 'Polo',  RoomNumber: 2 },
    { customerName: 'Barrel Racing Practice',  RoomNumber: 2 },
  ];


  return (
    <IonPage>
      
      <FormHeader />



      <div className="flex flex-col gap-8 px-4 py-8 bg-gray-100 overflow-y-auto h-full w-full text-black  ">
     
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Bookings</h1>
          <p className="text-sm text-gray-500">Track your customers, activity and history.</p>
        </div>

        <div className="grid gap-4 w-full h-fit">
          <DashboardTile title="Total Bookings " value={2} delta={1}/>
        </div>



        <div className="space-y-4">
            <p className='text-black text-xl'>
              Bookings
            </p>
            {record.map((event, index) => (
              <div onClick={() => router.push(`/record/a`)}>
              <ScheduleCard key={index} name={event.customerName} details={`Room ${event.RoomNumber}`} />
              </div>
            ))}
        </div>

        <div className="space-y-4">
            <p className='text-black text-xl'>
              Room Available
            </p>
            {record.map((event, index) => (
              <div onClick={() => router.push(`/record/a`)}>
              <ScheduleCard key={index} name={event.customerName} details={`Room ${event.RoomNumber}`} />
              </div>
            ))}
        </div>

      </div>
    </IonPage>

  );
};

export default Bookings;
