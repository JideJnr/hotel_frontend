import { IonButton, IonCol,  IonIcon, IonPage, IonRow, IonText, useIonRouter } from '@ionic/react';
import DashboardTile from '../../../components/templates/dashboardtiles/DashboardTiles';
import ScheduleCard from '../../../components/templates/card/ScheduleCard';
import { useHistory } from 'react-router';
import { FormHeader } from '../../../components/forms';

const Bookings = () => {
  const router = useIonRouter();

  const expenses = [
    {
      expenseType: 'Cleaning Supplies',
      price: '45.00',
    },
    {
      expenseType: 'Toiletries',
      price: '120.50',
    },
    {
      expenseType: 'Maintenance',
      price: '75.25',
    },
  ];

  const record = [
    { customerName: 'Dressage Practice', RoomNumber: 2 },
    { customerName: 'Polo',  RoomNumber: 2 },
    { customerName: 'Barrel Racing Practice',  RoomNumber: 2 },
  ];


  return (
        <IonPage>
          <FormHeader />
      
    <div className="flex flex-col gap-8 px-4 py-8 bg-gray-100 overflow-y-auto h-full w-full">
        
          <div className="grid gap-4 lg:gap-8 grid-cols-2 w-full h-fit">
            <DashboardTile title="Total Sales " value={2} delta={1}/>
            <DashboardTile title="Total Expenses" value={2} delta={1}/>
            <DashboardTile title="Total Sales " value={2} delta={1}/>
            <DashboardTile title="Total Expenses" value={2} delta={1}/>
          </div>
        
        {expenses.length === 0 ? (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
            <IonIcon src="assets/svgs/announce.svg" />
            <div className="overflow-hidden whitespace-nowrap flex-1">
              <div className="animate-marquee">
                <p className="text-sm font-medium text-dark">
                  You have not
                  registered any expense today
                </p>
              </div>
            </div>
          </div>
        ) : null}

     
          <div className="space-y-4">
            <p className='text-black text-xl'>
              Room Sales
            </p>
            {record.map((event, index) => (
              <div onClick={() => router.push(`/record/a`)}>
              <ScheduleCard key={index} name={event.customerName} details={`Room ${event.RoomNumber}`} />
              </div>
            ))}
          </div>
     

        {expenses.length > 0 && (
          <div className="space-y-4">
            <p className='text-black text-xl'>
                Expenses
            </p>
            {expenses.map((expenses, index) => (
              <div onClick={() => router.push(`/expenses/a`)}>
                <ScheduleCard key={index} name={expenses.expenseType} details={`N ${expenses.price}`} />
              </div>
            ))}
          </div>
        )}

      </div>

      </IonPage>

  );
};

export default Bookings;
