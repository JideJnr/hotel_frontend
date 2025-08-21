import { IonButton, IonCol,  IonIcon, IonRefresher, IonRefresherContent, IonRow, IonText, useIonRouter } from '@ionic/react';
import DashboardTile from '../../../components/templates/dashboardtiles/DashboardTiles';
import ScheduleCard from '../../../components/templates/card/ScheduleCard';
import { useRecord } from '../../../contexts/data/RecordContext';
import { useEffect, useState } from 'react';
import { useExpenses } from '../../../contexts/data/ExpensesContext';
import { useComputation } from '../../../contexts/data/ComputationContext';
import Footer from '../../../components/footer/footer';
import { formatNaira } from '../../../utils/formatNaira';
import DateHeader from '../../../components/table/DateHeader';
import FloatingMenu from '../../../components/table/FloatingMenu';
import dayjs from 'dayjs';
import EmptyState from '../../../components/empty/empty';
import { getHotelBusinessDate } from '../../../utils/utilities';
import LoadingPage from '../../../components/loading/Loading';

const Home = () => {
  const router = useIonRouter();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const {fetchRecords, records , loading:recordLoading } = useRecord();
  const {fetchExpensesOnDate, expenses , loading:expenseLoading} = useExpenses();
  const [currentDate, setCurrentDate] = useState(dayjs(getHotelBusinessDate()));
  const {
    fetchBalanceOnDate,
    fetchNewCustomersOnDateCount,
    newCustomerCount,
    balance,
    totalSales,
    totalExpenses,
    recordCount: salesCount,
    expensesCount,
    loading:computationLoading
  
  } = useComputation();
  
  const loading = recordLoading || expenseLoading || computationLoading;
  
  useEffect(() => {
    loadData();
  }, [currentDate]);

  const loadData = async () => {
    try {
      
      const formattedDate = currentDate.format("YYYY-MM-DD"); // adjust if API expects another format
      await Promise.all([
        fetchBalanceOnDate(formattedDate),
        fetchNewCustomersOnDateCount(formattedDate), 
        fetchExpensesOnDate(formattedDate),
        fetchRecords(formattedDate)
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
          {/* Dark hint overlay */}
        {loading && (
            <LoadingPage/>
      )}
        
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh} className="text-gray-800">
          <IonRefresherContent />
        </IonRefresher>
              
        <div className='px-4'>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Customer</h1>
          <p className="text-sm text-gray-500">Track your customers, activity and history.</p>
        </div>

        <div className=" px-4 grid gap-4 lg:gap-8 grid-cols-2 w-full h-fit">
            <DashboardTile title="Balance" value={formatNaira(balance|| 0) } delta={1}/>
            <DashboardTile title="Total Sales" value={formatNaira(totalSales ||0)} delta={1}/>
            <DashboardTile title="Total Expenses " value={formatNaira(totalExpenses || 0)} delta={1}/>
            <DashboardTile title="New Customer" value={newCustomerCount|| 0} delta={1}/>
        </div>

        <div
              className="flex flex-col gap-4 w-full h-full p-4 rounded-lg shadow-md bg-white" 
              >
                <div>
                  <DateHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
                </div>

              
                <div className={`  h-full   `} >

                
                  {records && records?.length > 0 && expenses &&  expenses?.length > 0 ?(

                  < div className='flex flex-col gap-8'>
                    {records && records?.length > 0 && (
                  <div className="space-y-4">
                    <p className='text-lg font-semibold text-black'>
                      Room Sales ({salesCount||0})
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
                          Expenses ({expensesCount||0})
                      </p>
                      {expenses.map((expenses, index) => (
                        <div onClick={() => router.push(`/expenses/${expenses.id}`)}>
                          <ScheduleCard key={index} name={expenses.category} details={`${formatNaira(expenses.amount)} `} />
                        </div>
                      ))}
                    </div>
                )}

                  </div>

                ) : (
                  <div className='py-4'>
                    <EmptyState/>
                  </div>
                ) }
              
              

        
                </div> 

              
              <Footer className=''/>
        </div>
        
        {user && user.role !== "ADMIN" && (
        <FloatingMenu/>)}    
      
      </div>

  );
};

export default Home;
