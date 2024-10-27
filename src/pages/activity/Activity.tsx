import { useActivities } from "../../context/activityContext";

const Activity = () => {
  const { activities, dataLoading, loadMoreActivities, setFilter } =
    useActivities();
  console.log(activities);
  return (
    <div className="p-4 bg-white">
      <div>
        {activities && activities.length !== 0 ? (
          <>
            {activities.map((activity, index) => (
              <div key={index} className="flex gap-x-3">
                <div className="w-16 text-end">
                  <span className="text-xs text-gray-500 dark:text-white/70">
                    {activity.time}
                  </span>
                </div>
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:dark:bg-bodybg2">
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <div className="size-2 rounded-full bg-gray-400 dark:bg-bodybg2"></div>
                  </div>
                </div>
                <div className="grow pt-0.5 pb-8">
                  <p className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                    Olajide sold room 20 for N25000
                  </p>
                  {activity.note && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
                      {activity.note}
                    </p>
                  )}
                  {activity.userImg ? (
                    <button
                      type="button"
                      className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white/70 dark:hover:dark:bg-bodybg dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
                    >
                      <img
                        className="flex-shrink-0 size-4 rounded-full"
                        src={activity.userImg}
                        alt="Image Note"
                      />
                      {activity.clientName}
                    </button>
                  ) : activity.userInitial ? (
                    <button
                      type="button"
                      className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white/70 dark:hover:dark:bg-bodybg dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10"
                    >
                      <span className="flex flex-shrink-0 justify-center items-center size-4 bg-white border border-gray-200 text-[10px] font-semibold uppercase text-gray-600 rounded-full dark:bg-bodybg dark:border-white/10 dark:text-white/70">
                        {activity.userInitial}
                      </span>
                      {activity.clientName}
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>empty</>
        )}
      </div>
    </div>
  );
};

export default Activity;
