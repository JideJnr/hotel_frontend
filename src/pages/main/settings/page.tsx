import { useIonRouter } from "@ionic/react";
import Button from "../../../components/button/button";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { getNameInitials } from "../../../utils/getInitials";



const Setting = () => {
  const router = useIonRouter();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { logout, loading } = useAuth();

    const handleLogout = async () => {
      try {
        await logout();
      } catch (err) {
        console.error('Login error:', err);
      }
    };


  
  return (
    <div className="w-full h-full max-w-screen max-h-screen flex bg-gray-100  ">
      <div className="w-full h-fit pt-8 gap-8 flex flex-col overflow-x-none overflow-y-auto text-sm">
        <div className="flex-col flex gap-4  ">
          <div className="w-full flex ">
            <div className=" mx-auto my-auto  border border-white w-24 h-24 uppercase border-gray-200 rounded-full bg-white shadow-md">
              <p className="text-3xl font-semibold text-gray-600 flex justify-center items-center h-full">
                {getNameInitials(user?.fullName || `NOT FOUND`) }                          
              </p>
            </div>
          </div>

          <div className="mx-auto w-fit">
            <p className="font-medium  text-lg text-black capitalize ">{user?.fullName}</p>
          </div>
        </div>

        <div className="w-full flex flex-col  px-4 2xl:px-8">
          
            <div
              className="flex w-full items-center justify-between border-y rounded-lg p-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                         onClick={() => router.push('/analytic', 'forward')}
            >
              <p>Analytics</p>
            </div>

                      
            <div
              className="flex w-full items-center justify-between border-y rounded-lg p-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                         onClick={() => router.push('/bookings', 'forward')}
            >
              <p>Bookings</p>
            </div>
          

            
          
          <div className="flex w-full items-center justify-between border-y rounded-lg py-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50">
            <p>DarkMode</p>
          </div>

          <div className="flex w-full items-center justify-between border-y rounded-lg py-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50">
            <p>Check For Update</p>
          </div>

          <a
            className="flex w-full items-center justify-between border-y rounded-lg py-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            href="tel:+2348105200066"
          >
            <p>Contact Support</p>
          </a>
        </div>

        <div className="flex justify-center p-4">
          <Button className="w-full "  text="Sign Out"  onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Setting;
