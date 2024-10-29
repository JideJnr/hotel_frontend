import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/dataContext";
import { FormProps } from "../register/customer/StepOne";
import { useIonRouter } from "@ionic/react";

const Setting = ({ setFormData: setModal }: FormProps) => {
  const router = useIonRouter();

  const handleSignout = async () => {
    await signOut(auth);
    router.push("/login");
    window.location.reload();
  };

  const { user } = useDataContext();

  const handleClick = (route: string) => {
    router.push(route);
    window.location.reload();
  };

  return (
    <div className="w-full h-full   gap-5 flex flex-col overflow-x-none overflow-y-auto text-sm">
      <div className="flex-col  ">
        <div className="w-full flex my-2">
          <div className=" mx-auto my-auto  border border-white w-16 h-16 ">
            <img src={user?.imgSrc} className="w-full h-full rounded-full" />
          </div>
        </div>

        <div className="mx-auto w-fit">
          <p className="font-medium  text-lg">{user?.name}</p>
        </div>
      </div>

      <div className="w-full flex flex-col  px-4 2xl:px-8">
        <div
          className="flex w-full items-center justify-between border-y rounded-lg p-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          onClick={() => handleClick("/analytics")}
        >
          <p>Analytics</p>
        </div>

        <Link to="/offer">
          <div className="flex w-full items-center justify-between border-y rounded-lg p-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50">
            <p>Offer Request</p>
          </div>
        </Link>

        <div className="flex w-full items-center justify-between border-y rounded-lg py-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50">
          <p>DarkMode</p>
        </div>

        <Link to="/support">
          <div className="flex w-full items-center justify-between border-y rounded-lg py-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50">
            <p>Contact Support</p>
          </div>
        </Link>
      </div>

      <div className="flex justify-center">
        <button
          className="cursor-pointer px-6 my-3  h-10 text-white  w-fit bg-[#111111]  rounded text-xs  hover:text-blue-500 duration-500"
          onClick={handleSignout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Setting;
