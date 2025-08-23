import { useEffect } from "react";
import { useActivity } from "../../../contexts/data/ActivityContext";
import { formatDate } from "../../../utils/utilities";
import Footer from "../../../components/footer/footer";
import { typeLabels, typeRoutes } from "../../../enum/enum";
import LoadingPage from "../../../components/loading/Loading";
import { useIonRouter } from "@ionic/react";

const Activities = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { fetchActivities, activities, loading } = useActivity();
  const router = useIonRouter();
  
  useEffect(() => {
    fetchActivities();
  }, []);

  // Helper: group activities by date
  const groupByDay = (acts: any[]) => {
    return acts.reduce((groups: any, act: any) => {
      const day = new Date(act.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      if (!groups[day]) groups[day] = [];
      groups[day].push(act);
      return groups;
    }, {});
  };

  const groupedActivities = activities ? groupByDay(activities) : {};

  return (
    <div className="p-4 pt-8 bg-gray-100 text-gray-800 w-full h-full flex flex-col gap-6 overflow-y-auto capitalize">
        {loading && (
            <LoadingPage/>
      )}
      
      {loading ? (
        <div className="text-gray-500 text-sm">Loading...</div>
      ) : activities?.length > 0 ? (
        Object.keys(groupedActivities).map((day, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            {/* Day header */}
            <h2 className="text-xs font-semibold text-gray-500 border-b border-gray-200 pb-1">
              {day}
            </h2>

            {groupedActivities[day].map((act: any, index: number) => (
              <div key={index} className="grid grid-cols-12 gap-x-3">
                {/* Time */}
                <div className="col-span-3 text-end my-auto">
                  <span className="text-xs text-gray-500">
                    {new Date(act.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Timeline indicator */}
                <div className="col-span-1 relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <div className="size-2 rounded-full bg-gray-400"></div>
                  </div>
                </div>

                {/* Activity details */}
                <div className="col-span-8 p-1.5 pb-4"                     onClick={() => {
                    const target = typeRoutes[act.type] ? typeRoutes[act.type](act) : null;
                    if (target) {
                      router.push(target);
                    }
                  }}>
                  <p className="mt-1 text-sm text-gray-600">
                    {user.role === "ADMIN" 
                      ? act.userName || "ADMIN" 
                      : "You"}{" "}
                    { act.description}

                  </p>

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
            ))}
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-sm">No activities found</div>
      )}

      <Footer className="!bg-gray-100 mt-auto" />
    </div>
  );
};

export default Activities;
