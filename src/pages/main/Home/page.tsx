import { IonButton, IonCol,  IonIcon, IonRow, IonText, useIonRouter } from '@ionic/react';
import DashboardTile from '../../../components/templates/dashboardtiles/DashboardTiles';
import ScheduleCard from '../../../components/templates/card/DashboardCards';



const Home = () => {
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

const events = [
  { title: 'Dressage Practice', time: '9:00AM - 11:00AM' },
  { title: 'Polo', time: '11:00AM - 12:00PM' },
  { title: 'Barrel Racing Practice', time: '12:00PM - 1:00PM' },
];

  return (

      <div className="flex flex-col gap-8 px-4 py-8 bg-gray-100 overflow-y-auto h-full w-full">
        
          <div className="grid gap-4 lg:gap-8 grid-cols-2 w-full h-fit">
            <DashboardTile title="Balance" value={20000} delta={1}/>
            <DashboardTile title="Active Room" value={2} delta={1}/>
            <DashboardTile title="Total Sales " value={2} delta={1}/>
            <DashboardTile title="New Customer" value={2} delta={1}/>
          </div>

          <IonRow className="ion-justify-content-between ion-align-items-center   ion-padding-horizontal">
            <IonCol size="auto">
              <IonButton 
                fill="clear" 
                className="ion-text-center ion-no-padding"
                onClick={() => router.push('/sales/stepone', 'forward')}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <IonIcon
                    icon="people"
                    className="border border-primary p-4 bg-[#ebe8fe] rounded-full text-[24px] text-black "
                  />
                  <IonText className="text-[12px] font-medium leading-[20px] tracking-[-0.13px] text-gray-700 font-semibold">
                    Room
                  </IonText>
                </div>
              </IonButton>
            </IonCol>

            <IonCol size="auto">
              <IonButton 
                fill="clear" 
                className="ion-text-center ion-no-padding"
                onClick={() => router.push('/register/customer/stepone', 'forward')}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <IonIcon
                    icon="person-add"
                    className=" p-4 bg-[#e8fef1] rounded-full text-[24px] text-green-400"
                  />
                  <IonText className="text-[12px] font-medium leading-[20px] tracking-[-0.13px] text-gray-700 font-semibold">
                    Client 
                  </IonText>
                </div>
              </IonButton>
            </IonCol>

            <IonCol size="auto">
              <IonButton 
                fill="clear" 
                className="ion-text-center ion-no-padding"
                onClick={() => router.push('/register/expenses/stepone', 'forward')}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <IonIcon
                    icon="cash"
                    className=" p-4 bg-[#e8f4fe] rounded-full text-[24px] text-blue-400"
                  />
                  <IonText className="text-[12px] font-medium leading-[20px] tracking-[-0.13px] text-gray-700 font-semibold">
                    Expenses
                  </IonText>
                </div>
              </IonButton>
            </IonCol>


            <IonCol size="auto">
              <IonButton 
                fill="clear" 
                className="ion-text-center ion-no-padding"
                onClick={() => router.push('/register/booking', 'forward')}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <IonIcon
                    icon="calendar"
                    className=" p-4 bg-[#f3e8fe] rounded-full text-[24px] text-purple-400"
                  />
                  <IonText className="text-[14px] font-medium leading-[20px] tracking-[-0.13px] text-gray-700 font-semibold">
                    Book
                  </IonText>
                </div>
              </IonButton>
            </IonCol>
          </IonRow>
        

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
            {events.map((event, index) => (
              <ScheduleCard key={index} title={event.title} time={event.time} />
            ))}
          </div>
     

        {expenses.length > 0 && (
          <div className="space-y-4">
            <p className='text-black text-xl'>
                Expenses
            </p>
            {events.map((event, index) => (
              <ScheduleCard key={index} title={event.title} time={event.time} />
            ))}
          </div>
        )}

      </div>

  );
};

export default Home;
