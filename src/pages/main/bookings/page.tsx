import {  IonPage, useIonRouter } from '@ionic/react';
import ScheduleCard from '../../../components/templates/card/ScheduleCard';
import { FormHeader } from '../../../components/forms';
import DashboardTile from '../../../components/templates/dashboardtiles/DashboardTiles';
import SearchModal from '../../../components/modal/BookingModal';
import { useState } from 'react';
import Footer from '../../../components/footer/footer';
import { useBooking } from '../../../contexts/data/BookingContext';
import EmptyState from '../../../components/empty/empty';
import LoadingPage from '../../../components/loading/Loading';

const Bookings = () => {
  const router = useIonRouter();
  const [showSearch, setShowSearch] = useState(true); // Modal opens by default
  const {bookings, loading } = useBooking();
  const data = bookings.bookings? bookings.bookings : []; 

  return (
    <IonPage>
      <FormHeader />
        {loading && (
            <LoadingPage/>
      )}

      <SearchModal 
        isOpen={showSearch} 
        onClose={() => setShowSearch(false)} 
      />
      <div className="flex flex-col gap-8  pt-8 bg-gray-100 overflow-y-auto h-full w-full text-black  ">
     
        <div className='px-4'>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Bookings</h1>
          <p className="text-sm text-gray-500">Track your room bookings.</p>
        </div>

        <div className=" px-4 grid gap-4 w-full h-fit">  
          <DashboardTile title="Active Bookings " value={bookings.count} delta={1}/>
        </div>


        <div className='bg-white h-full w-full px-4 pt-8 gap-8 flex flex-col'>
          <div className='flex items-center justify-between'>
            <p className='text-lg font-semibold text-black'>
                  Active Bookings
            </p>
                      <button
            onClick={() => setShowSearch(true)}
            className="w-fit ml-auto mr-4 flex items-center justify-center text-gray-600 hover:text-gray-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24" 
              strokeWidth={2} stroke="currentColor" 
              className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>

          </button>


          </div>
          {data?.length > 0 ? (
            <div className="space-y-4">

                {data?.length > 0 && data.map((event:any, index:any) => (
                  <div onClick={() => router.push(`/record/a`)}>
                  <ScheduleCard key={index} name={event.customerId} details={`Room ${event.RoomId}`} />
                  </div>
                ))}
            </div>):<EmptyState/>}


            <Footer/>

        </div>


      </div>
    </IonPage>

  );
};

export default Bookings;
