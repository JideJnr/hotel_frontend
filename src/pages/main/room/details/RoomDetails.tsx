import { useParams } from "react-router-dom";
import { IonPage, useIonRouter } from "@ionic/react";
import Button from "../../../../components/button/button";
import { BackFormContainer, DetailRow, FormHeader } from "../../../../components/forms";
import { useRoom } from "../../../../contexts/data/RoomContext";
import { useEffect, useState } from "react";
import { getNameInitials } from "../../../../utils/getInitials";
import Footer from "../../../../components/footer/footer";
import { useRecord } from "../../../../contexts/data/RecordContext";
import { toast } from "react-toastify";
import { Edit3, Phone } from "lucide-react";
import { formatNaira } from "../../../../utils/formatNaira";
import LoadingPage from "../../../../components/loading/Loading";
import { formatFirestoreDate } from "../../../../utils/utilities";

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { fetchRoom , currentRoom , loading} = useRoom();
  const { checkOutRecord, loading:checkOutLoading } = useRecord();
  const router = useIonRouter();
  useEffect(() => {
    fetchRoom(id);
  }, [id]);

  const handleCheckout = async () => {
    if (!currentRoom?.activeCustomer) return;

    try {
      const res = await checkOutRecord(currentRoom.activeCustomer.recordId); // call context checkout
      if (res?.success) {
       
        fetchRoom(id); // refresh room to clear active customer
      } else {
        toast.error(res?.message || "Checkout failed");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Checkout failed");
    }
  };

  
  // State for pagination
  const [bookings, setBookings] = useState(currentRoom?.bookings || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  
  // Calculate pagination values
  useEffect(() => {
    setTotalPages(Math.ceil(bookings.length / itemsPerPage));
  }, [bookings, itemsPerPage]);

  // Get current bookings
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber:any) => setCurrentPage(pageNumber);

  // Handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max pages to show, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
    
  return (
    <IonPage>
      {loading && (
        <LoadingPage/>
      )}
      <FormHeader /> 
      <BackFormContainer title="Room Details" subtitle="" className="max-w-2xl h-full">
        <div className="w-full h-full flex flex-col gap-8 text-gray-800 capitalize">

          {/* Profile Image and Basic Info */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 border text-gray-600 font-bold text-xl uppercase">
              {getNameInitials(currentRoom?.name || "Room")}
            </div>

            <div className="flex flex-col text-sm gap-1">
              <h2 className="text-2xl font-semibold">Room {currentRoom?.name || ""}</h2>
            </div>
          </div>

          {user && user.role == 'ADMIN' && 

          <div className="flex items-center gap-4 w-full" onClick={() => router.push('/register/room/stepone', 'forward')}>
            {/* Edit Button (secondary / gray outline) */}
            <a className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-800 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition w-1/2">
              <Edit3 size={16} />
              Update
            </a>

            {/* Contact Button (primary / filled blue) */}
            <a
              onClick={() => router.push('/register/customer/stepone', 'forward')}
              className="flex items-center justify-center gap-2 px-4 py-2 text-black border border-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100  transition w-1/2"
            >
              <Phone size={16} />
              Analysis
            </a>
          </div>}

          {/* Personal Information */}
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-600 grid grid-cols-1 gap-4 px-2">
              <DetailRow label='Description' value={currentRoom?.description||'-'}/>
              {currentRoom && currentRoom?.priceOneHour > 0 && <DetailRow label='Short Rest (One Hour)' value={formatNaira(currentRoom?.priceOneHour||0)}/>}
              {currentRoom && currentRoom?.priceTwoHour > 0 && <DetailRow label='Short Rest (Two Hours)' value={formatNaira(currentRoom?.priceTwoHours||0)} />}
              {currentRoom && currentRoom?.pricePerNight > 0 &&<DetailRow label='Overnight' value={formatNaira(currentRoom?.pricePerNight||0)}/>}
            </div>
          </div>

          {currentRoom && currentRoom.active &&
            <div className="flex flex-col gap-4 bg-gray-50 border rounded-lg p-4">
              <h3 className="text-lg font-semibold">Current Stay</h3>
              <div className="text-sm flex items-center gap-4">
                <span className="flex w-8 h-8 flex-shrink-0 justify-center items-center bg-white border border-gray-200 text-[10px] font-semibold uppercase text-gray-600 rounded-full ">
                  {getNameInitials(currentRoom?.activeCustomer?.customerName|| "Guest")}
                </span>
                <p className="font-semibold">{currentRoom?.activeCustomer?.customerName || "Guest"}</p>
              </div>
              
              <div className="grid grid-cols-1 gap-2 mt-2">
                <Button text="Check Out" className="w-full" onClick={handleCheckout} loading={checkOutLoading} loadingText="checking out..." />
              </div>
            </div>
          }

          {currentRoom?.bookings && currentRoom?.bookings.length > 0 &&
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Room History</h3>
              {currentRoom?.bookings?.map((booking:any, index:any) => (
                <div
                  key={index}
                  onClick={() => router.push(`/record/${booking.recordId}`, 'forward')}
                  className="flex gap-4 items-center px-4 py-2 border rounded-md text-sm"
                >
                  <span className="flex w-10 h-10 flex-shrink-0 justify-center items-center bg-white border border-gray-200 text-[10px] font-semibold uppercase text-gray-600 rounded-full ">
                    {getNameInitials(booking?.customerName)}
                  </span>
                  <div>
                    <p className="font-semibold">{booking.customerName || ''}</p>
                    <p className="text-gray-500"> {formatFirestoreDate(booking.checkedInTime)}</p>
                  </div>
                  <div className="text-xs text-gray-500 ml-auto mr-2">{formatNaira(booking.price)}</div>
                </div>
                
              ))}
            <div className="flex justify-between mt-4">
              <button
                className="btn-outline-light tablebutton me-2 mb-2 sm:mb-0 sm:inline block"
            
              >
                {" Previous "}
              </button>

              <button
                className="btn-outline-light tablebutton sm:inline block me-2 mb-2 sm:mb-0"
                
              >
                {" Next "}
              </button>
            </div>
            </div>
          }

          <Footer className="mt-auto" showCopyright={true} />

          
        </div>

        
      
        
      </BackFormContainer>
      
   
    </IonPage>
  );
};

export default RoomDetails;
