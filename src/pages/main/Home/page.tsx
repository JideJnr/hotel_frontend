import { IonButton, IonCol,  IonIcon, IonRefresher, IonRefresherContent, IonRow, IonText, useIonRouter } from '@ionic/react';
import DashboardTile from '../../../components/templates/dashboardtiles/DashboardTiles';
import ScheduleCard from '../../../components/templates/card/ScheduleCard';
import { useRecord } from '../../../contexts/data/RecordContext';
import { useEffect } from 'react';
import { useExpenses } from '../../../contexts/data/ExpensesContext';
import { useComputation } from '../../../contexts/data/ComputationContext';
import Footer from '../../../components/footer/footer';
import { getTodayDate } from '../../../utils/utilities';
import { formatNaira } from '../../../utils/formatNaira';

const Home = () => {
  const router = useIonRouter();

  const {fetchRecords, records } = useRecord();
  const {fetchExpensesOnDate, expenses} = useExpenses();

  const {
    fetchBalanceOnDate,
    fetchNewCustomersOnDateCount,
    fetchRecordCountOnDate,
    recordCount,
    newCustomerCount,
    balance,
    expensesCount,
    fetchExpensesCountOnDate
  } = useComputation();

  const todaysDate = getTodayDate();
  
useEffect(() => {
  loadData(); // initial load whenever todaysDate changes
}, [todaysDate]);

const loadData = async () => {
  try {
    await Promise.all([
      fetchBalanceOnDate(todaysDate),
      fetchNewCustomersOnDateCount(todaysDate),
      fetchRecordCountOnDate(todaysDate),
      fetchExpensesCountOnDate(todaysDate),
      fetchRecords(todaysDate),
      fetchExpensesOnDate(todaysDate),
    ]);
  } catch (err) {
    console.error("Load data error:", err);
  }
};

const handleRefresh = async (e: CustomEvent) => {
  await loadData();
  e.detail.complete();
};


  return (
    <div className="flex flex-col gap-8  pt-8 bg-gray-100 overflow-y-auto h-full w-full text-black">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh} className="text-gray-800">
          <IonRefresherContent />
        </IonRefresher>
              
        <div className='px-4'>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Customer</h1>
          <p className="text-sm text-gray-500">Track your customers, activity and history.</p>
        </div>
        
        <div className=" px-4 grid gap-4 lg:gap-8 grid-cols-2 w-full h-fit">
            <DashboardTile title="Balance" value={formatNaira(balance|| 0) } delta={1}/>
            <DashboardTile title="Active Sales" value={recordCount||0} delta={1}/>
            <DashboardTile title="Total Expense " value={expensesCount || 0} delta={1}/>
            <DashboardTile title="New Customer" value={newCustomerCount|| 0} delta={1}/>
        </div>

        {expenses?.length === 0 ? (
          <div className="mx-4 flex items-center gap-3 p-3 rounded-lg bg-white">
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

        <IonRow className=" ion-justify-content-between ion-align-items-center   ion-padding-horizontal">
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
                  <IonText className="text-[12px] font-medium leading-[20px] tracking-[-0.13px] text-black font-semibold">
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
                onClick={() => router.push('/register/booking/stepone', 'forward')}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <IonIcon
                    icon="book"
                    className=" p-4 bg-[#f3e8fe] rounded-full text-[24px] text-purple-400"
                  />
                  <IonText className="text-[14px] font-medium leading-[20px] tracking-[-0.13px] text-gray-700 font-semibold">
                    Book
                  </IonText>
                </div>
              </IonButton>
            </IonCol>
        </IonRow>
      

          <div
            className={`flex flex-col gap-4 w-full h-full p-4 rounded-lg shadow-md 
            ${records?.length > 0 || expenses?.length > 0 ? "bg-white" : ""}`}
            >

            <div className={`  h-full space-y-4   `} >
          {records && records?.length > 0 && (
            <div className="space-y-4">
              <p className='text-lg font-semibold text-black'>
                Room Sales
              </p>
              <div className=' flex flex-col space-y-2'>
                {records?.map((event, index) => (
                  <div onClick={() => router.push(`/record/${event.id}`)}>
                    <ScheduleCard key={index} name={event.customerName} details={`Room ${event.roomName}`}>
                      <div className={`w-2 h-2 rounded-full {record.active ? 'bg-emerald-500':''} flex items-center justify-center`}>
                      </div>
                    </ScheduleCard>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {expenses &&  expenses?.length > 0 && (
              <div className="space-y-4">
                <p className='text-lg font-semibold text-black'>
                    Expenses
                </p>
                {expenses.map((expenses, index) => (
                  <div onClick={() => router.push(`/expenses/${expenses.id}`)}>
                    <ScheduleCard key={index} name={expenses.category} details={`N ${expenses.amount}`} />
                  </div>
                ))}
              </div>
          )}

      
        </div> 
        
        
   
        <Footer className=''/>
      </div>


   
      
      </div>

  );
};

export default Home;
