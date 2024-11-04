import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/dataContext";
import { FormProps } from "../register/customer/StepOne";
import { useIonRouter } from "@ionic/react";
import Button from "../../components/button/button";

const Setting = ({ setFormData: setModal }: FormProps) => {
  const router = useIonRouter();

  const handleSignout = async () => {
    await signOut(auth);
    router.push("/");
    window.location.reload();
  };

  const { user } = useDataContext();

  const handleClick = (route: string) => {
    router.push(route);
    window.location.reload();
  };

  return (
    <div className="w-full h-full max-w-screen max-h-screen flex ">
      <div className="w-full h-fit pt-8 gap-8 flex flex-col overflow-x-none overflow-y-auto text-sm">
        <div className="flex-col flex gap-4  ">
          <div className="w-full flex ">
            <div className=" mx-auto my-auto  border border-white w-24 h-24 ">
              <img src={user?.imgSrc} className="w-full h-full rounded-full" />
            </div>
          </div>

          <div className="mx-auto w-fit">
            <p className="font-medium  text-lg">{user?.name}</p>
          </div>
        </div>

        <div className="w-full flex flex-col  px-4 2xl:px-8">
          {user && user?.role === "admin" && (
            <div
              className="flex w-full items-center justify-between border-y rounded-lg p-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              onClick={() => handleClick("/analytics")}
            >
              <p>Analytics</p>
            </div>
          )}
          {user && user?.role === "admin" && (
            <div
              className="flex w-full items-center justify-between border-y rounded-lg p-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              onClick={() => handleClick("/offer")}
            >
              <p>Offer Request</p>
            </div>
          )}

          <div
            className="flex w-full items-center justify-between border-y rounded-lg p-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            onClick={() => handleClick("/funding")}
          >
            <p>Fund Account</p>
          </div>

          <div className="flex w-full items-center justify-between border-y rounded-lg py-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50">
            <p>DarkMode</p>
          </div>

          <div className="flex w-full items-center justify-between border-y rounded-lg py-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50">
            <p>Check For Update</p>
          </div>

          <div
            className="flex w-full items-center justify-between border-y rounded-lg py-2 px-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            onClick={() => handleClick("/supports")}
          >
            <p>Contact Support</p>
          </div>
        </div>

        <div className="flex justify-center p-4">
          <Button className="w-full " onClick={handleSignout} text="Logout" />
        </div>
      </div>
    </div>
  );
};

export default Setting;
