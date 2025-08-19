import {  IonPage, useIonRouter } from '@ionic/react';
import ScheduleCard from '../../../components/templates/card/ScheduleCard';
import { FormHeader } from '../../../components/forms';
import DashboardTile from '../../../components/templates/dashboardtiles/DashboardTiles';
import SearchModal from '../../../components/modal/BookingModal';
import { useState } from 'react';
import Footer from '../../../components/footer/footer';
import { useBooking } from '../../../contexts/data/BookingContext';

const Bookings = () => {
  const router = useIonRouter();
  const [showSearch, setShowSearch] = useState(true); // Modal opens by default
  const {bookings } = useBooking();

  return (
    <IonPage>
      <FormHeader />

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
          <DashboardTile title="Active Bookings " value={2} delta={1}/>
        </div>


        <div className='bg-white h-full w-full px-4 pt-8 gap-8 flex flex-col'>
          
            <div className="space-y-4">
                <p className='text-black text-xl'>
                  Active Bookings
                </p>
                {bookings.map((event, index) => (
                  <div onClick={() => router.push(`/record/a`)}>
                  <ScheduleCard key={index} name={event.customerName} details={`Room ${event.RoomNumber}`} />
                  </div>
                ))}
            </div>

            <div className="space-y-4">
                <p className='text-black text-xl'>
                  Cancelled Bookings
                </p>
                {bookings.map((event, index) => (
                  <div onClick={() => router.push(`/record/a`)}>
                  <ScheduleCard key={index} name={event.customerName} details={`Room ${event.RoomNumber}`} />
                  </div>
                ))}
            </div>

            <Footer/>

        </div>


      </div>
    </IonPage>

  );
};

export default Bookings;
