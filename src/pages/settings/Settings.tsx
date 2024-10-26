import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/dataContext";

const Setting = () => {
  const handleSignout = async () => {
    await signOut(auth);
  };

  const { user } = useDataContext();

  return (
    <div className="mt-2 flow-root  ">
      <div className="w-full h-full  p-4 md:p-8 gap-10 flex flex-col overflow-x-none overflow-y-auto">
        <div className="flex-col  ">
          <div className="w-full flex my-5"></div>

          <div className="mx-auto w-fit">
            <p className="text-xl font-medium">{user?.name}</p>
          </div>
        </div>

        <div className="w-full flex flex-col  px-8 md:px-12 py-4"></div>

        <div className="w-full flex flex-col  p-4 md:p-8">
          <Link to="/orderroom">
            <div className="flex w-full items-center justify-between border-y rounded-lg py-4 px-6  text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              <p>Profile</p>
            </div>
          </Link>

          <Link to="/runexpenses">
            <div className="flex w-full items-center justify-between border-y rounded-lg py-4 px-6 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              <p>Support</p>
            </div>
          </Link>

          <Link to="/support">
            <div className="flex w-full items-center justify-between border-y rounded-lg py-4 px-6 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              <p>Contact Support</p>
            </div>
          </Link>
        </div>

        <div className="flex justify-center">
          <button
            className="cursor-pointer px-6 my-3  h-10 text-white  w-28 bg-[#111111]  rounded text-xs ] hover:text-blue-500 duration-500"
            onClick={handleSignout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
