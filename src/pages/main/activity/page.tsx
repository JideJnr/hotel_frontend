import { IonContent } from "@ionic/react";
import { useEffect } from "react";
import { useActivity } from "../../../contexts/data/ActivityContext";
import { formatDate } from "../../../utils/utilities";
import Footer from "../../../components/footer/footer";

const activities = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { fetchActivities, activities, loading } = useActivity();

  useEffect(() => {
    fetchActivities();
  }, []);

  console.log( activities)

  return (
    <div className="p-4 bg-gray-100 text-gray-800 w-full h-full flex flex-col gap-4 overflow-y-auto">
      <div>Filters</div>

      {loading ? (
        <div className="text-gray-500 text-sm">Loading...</div>
      ) : activities?.length > 0 ? (
        activities?.map((act, index) => (
          <div key={index} className="grid grid-cols-12 gap-x-3">
            <div className="col-span-3 text-end my-auto ">
              <span className="text-xs text-gray-500 ">
                {formatDate(act.createdAt)}
              </span>
            </div>
            <div className="col-span-1 relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
              <div className="relative z-10 size-7 flex justify-center items-center">
                <div className="size-2 rounded-full bg-gray-400"></div>
              </div>
            </div>
            <div className="col-span-8 p-1.5 pb-4">
              <p className="flex gap-x-1.5 font-semibold text-gray-800">
                {user.role === "ADMIN" ? act.hostName : "You"}{" "}
                {act.type === "User Created" && "Created Your Profile"}
                {act.type === "Ran Expenses" && "Ran Expenses for "}
                {act.type === "record_created" &&
                  `Sold room ${act.room} for N${act.price}`}
              </p>

              {act.description && (
                <p className="mt-1 text-sm text-gray-600">{act.description}</p>
              )}

              {act.userImg ? (
                <button
                  type="button"
                  className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  <img
                    className="flex-shrink-0 size-4 rounded-full"
                    src={act.userImg}
                    alt="User"
                  />
                  {act.clientName}
                </button>
              ) : act.userInitial ? (
                <button
                  type="button"
                  className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  <span className="flex flex-shrink-0 justify-center items-center size-4 bg-white border border-gray-200 text-[10px] font-semibold uppercase text-gray-600 rounded-full">
                    {act.userInitial}
                  </span>
                  {act.clientName}
                </button>
              ) : null}
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-sm">No activities found</div>
      )}
      <Footer className='!bg-gray-100 mt-auto'/>
    </div>
  );
};

export default activities;
