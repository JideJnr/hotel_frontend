import { IonButton, IonCol, IonContent, IonIcon, IonRow, IonText, useIonRouter } from '@ionic/react';
import  { useMemo } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Table, { Column } from '../../../components/table/table';
import { displayPrice } from '../../../utils/formatNaira';
import DashboardTile from '../../../components/templates/dashboardtiles/DashboardTiles';


const Home = () => {
  const router = useIonRouter();
  const { user } = useAuth();

  const columns: Column[] = useMemo(
    
    () => [
      {
        Header: 'Name',
        accessor: 'customerName',
        Cell: ({ value }: { value: string }) => (
          <div className="flex gap-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Passport"
              style={{ width: '20px', height: '20px', borderRadius: '50%' }}
            />
            <p>{value}</p>
          </div>
        ),
      },
      {
        Header: 'Room',
        accessor: 'roomNumber',
        Cell: ({ value }: { value: string }) => (
          <p className="flex gap-1">
            <span>{value}</span>
          </p>
        ),
      },
      {
        Header: '',
        accessor: 'status',
        Cell: ({ value }: { value: string }) => (
          <div className="flex gap-x-1.5 h-fit w-fit mx-auto rounded-full p-1 lg:px-2 bg-yellow-400/20">
            <p className="text-xs leading-5 text-gray-500 hidden lg:flex">
              {value}
            </p>
            <div className="h-full flex w-fit">
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-400 flex my-auto" />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const expensesColumns: Column[] = useMemo(
    () => [
      {
        Header: 'Expenses',
        accessor: 'expenseType',
      },
      {
        Header: 'Amount',
        accessor: 'price',
        Cell: ({ value }: { value: string }) => (
          <p className="text-xs leading-5 text-gray-500">
            {displayPrice(Number(value))}
          </p>
        ),
      },
    ],
    []
  );

  const filteredRecord = [
    {
      customerName: 'John Doe',
      roomNumber: '101',
      status: 'Checked In',
    },
    {
      customerName: 'Jane Smith',
      roomNumber: '205',
      status: 'Checked Out',
    },
    {
      customerName: 'Robert Johnson',
      roomNumber: '312',
      status: 'Reserved',
    },
  ];

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

  return (

      <div className="flex flex-col gap-12 px-4 py-8 bg-gray-100 overflow-y-auto">
        <>
          <div className="grid gap-4 lg:gap-8 md:grid-cols-3 w-full h-fit">
            <DashboardTile label="Balance" unit={displayPrice(20000)} />
            <DashboardTile label="Active Room" unit={2} />
            <DashboardTile label="Active Room" unit={2} />
          </div>

          <IonRow className="ion-justify-content-between ion-align-items-center   ion-padding-horizontal">
  <IonCol size="auto">
    <IonButton 
      fill="clear" 
      className="ion-text-center ion-no-padding"
      onClick={() => router.push('/register/sales', 'forward')}
    >
      <div className="flex flex-col items-center gap-1.5">
        <IonIcon
          icon="people"
          className="border border-primary p-4 bg-[#ebe8fe] rounded-full text-[24px] text-primary"
        />
        <IonText className="text-[12px] font-medium leading-[20px] tracking-[-0.13px] text-black">
          Room
        </IonText>
      </div>
    </IonButton>
  </IonCol>

  <IonCol size="auto">
    <IonButton 
      fill="clear" 
      className="ion-text-center ion-no-padding"
      onClick={() => router.push('/register/client', 'forward')}
    >
      <div className="flex flex-col items-center gap-1.5">
        <IonIcon
          icon="person-add"
          className="border border-green-400 p-4 bg-[#e8fef1] rounded-full text-[24px] text-green-400"
        />
        <IonText className="text-[12px] font-medium leading-[20px] tracking-[-0.13px]">
          Client
        </IonText>
      </div>
    </IonButton>
  </IonCol>

  <IonCol size="auto">
    <IonButton 
      fill="clear" 
      className="ion-text-center ion-no-padding"
      onClick={() => router.push('/register/expenses', 'forward')}
    >
      <div className="flex flex-col items-center gap-1.5">
        <IonIcon
          icon="cash"
          className="border border-blue-400 p-4 bg-[#e8f4fe] rounded-full text-[24px] text-blue-400"
        />
        <IonText className="text-[12px] font-medium leading-[20px] tracking-[-0.13px]">
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
          className="border border-purple-400 p-4 bg-[#f3e8fe] rounded-full text-[24px] text-purple-400"
        />
        <IonText className="text-[12px] font-medium leading-[20px] tracking-[-0.13px]">
          Book
        </IonText>
      </div>
    </IonButton>
  </IonCol>
</IonRow>
        </>

        {expenses.length === 0 ? (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
            <IonIcon src="assets/svgs/announce.svg" />
            <div className="overflow-hidden whitespace-nowrap flex-1">
              <div className="animate-marquee">
                <p className="text-sm font-medium text-dark">
                  {user?.role !== 'admin' ? 'You' : 'Your team'} have not
                  registered any expense today
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div>
          <Table
            columns={columns}
            data={filteredRecord}
            onClick={(row) => {
              
              router.push(`/clients/${row.name}`, 'forward');
            }}
          />
        </div>

        {expenses.length > 0 && (
          <div>
            <Table columns={expensesColumns} data={expenses} />
          </div>
        )}
      </div>

  );
};

export default Home;
