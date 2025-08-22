import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  useIonRouter,
  IonRefresher,
  IonRefresherContent,
  IonIcon,
} from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import { useEffect, useMemo, useState } from "react";
import DashboardTile from "../../../components/templates/dashboardtiles/DashboardTiles";
import ScheduleCard from "../../../components/templates/card/ScheduleCard";
import { useRoom } from "../../../contexts/data/RoomContext";
import { useComputation } from "../../../contexts/data/ComputationContext";
import Footer from "../../../components/footer/footer";
import EmptyState from "../../../components/empty/empty";
import LoadingPage from "../../../components/loading/Loading";

const PAGE_SIZE = 5; // items per page (unchanged)

const Room = () => {
  const router = useIonRouter();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [activeTab, setActiveTab] = useState<"available" | "active">(
    "available"
  );

  // pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { fetchRooms, rooms, loading: roomLoading } = useRoom();
  const {
    fetchTotalRoomsCount,
    fetchActiveRoomsCount,
    totalRoomCount,
    activeRoomCount,
    loading: computationLoading,
  } = useComputation();

  const loading = roomLoading || computationLoading;

  const loadData = async () => {
    try {
      await Promise.all([
        fetchRooms(),
        fetchTotalRoomsCount(),
        fetchActiveRoomsCount(),
      ]);
    } catch (err) {
      console.error("Load data error:", err);
    }
  };

  useEffect(() => {
    loadData(); // initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = async (e: CustomEvent) => {
    await loadData();
    e.detail.complete();
  };

  const handleAddNew = () => router.push("/register/room/stepone");
  const handleRoomClick = (id?: string) => id && router.push(`/room/${id}`);

const { totalRoomsCount, activeRoomsCount } = useMemo(() => {
  const total = rooms.length;
  const active = rooms.reduce((acc, r) => acc + (r.active ? 1 : 0), 0);
  return { totalRoomsCount: total, activeRoomsCount: active };
}, [rooms]);


  const TABS = [
    { value: "available", label: `Available ` },
    { value: "active", label: `Active (${activeRoomsCount})` },
  ] as const;

  // filtered list based on active tab
  const filteredRooms = useMemo(() => {
    switch (activeTab) {
      case "active":
        return rooms.filter((room: any) => room.active);
      default:
        return rooms.filter((room: any) => !room.active);
    }
  }, [rooms, activeTab]);

  // computed values
  const totalPages = Math.max(1, Math.ceil(filteredRooms.length / PAGE_SIZE));
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  // keep page within bounds if list changes
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  // reset page to 1 when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // paginated slice for current page
  const paginatedRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredRooms.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredRooms, currentPage]);

  // handlers used by the pagination UI
  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const handlePageChange = (page: number) => setCurrentPage(page);

  // build page number buttons (max 5 visible) — same logic as your snippet
  const pageButtons = useMemo(() => {
    const visibleCount = Math.min(5, totalPages);
    return Array.from({ length: visibleCount }, (_, i) => {
      let pageNum: number;
      if (totalPages <= 5) pageNum = i + 1;
      else if (currentPage <= 3) pageNum = i + 1;
      else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
      else pageNum = currentPage - 2 + i;
      return pageNum;
    });
  }, [totalPages, currentPage]);

  // assuming `rooms: Array<{ id: string; active: boolean; ... }>`


  return (
    <div className="flex flex-col gap-8 pt-8 bg-gray-100 overflow-y-auto h-full w-full text-black">
      {loading && <LoadingPage />}

      <IonRefresher
        slot="fixed"
        onIonRefresh={handleRefresh}
        className="text-gray-800"
      >
        <IonRefresherContent />
      </IonRefresher>

      <div className="px-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Rooms
          </h1>
          <p className="text-sm text-gray-500">
            Manage your rooms, availability and details.
          </p>
        </div>
      </div>

      <div className="px-4 grid gap-4 lg:gap-8 grid-cols-2 w-full h-fit">
        <DashboardTile title="Total  Rooms" value={totalRoomCount || 0} delta={1} />
        <DashboardTile title="Active Rooms" value={activeRoomCount || 0} delta={1} />
      </div>

      {user && user.role === "ADMIN" && (
        <div className="px-4 w-fit ml-auto mr-2">
          <button className="text-black" onClick={handleAddNew}>
            Add New
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 w-full h-full bg-white p-4 rounded-lg shadow-md">
        <IonSegment
          value={activeTab}
          mode="md"
          onIonChange={(e) =>
            setActiveTab(e.detail.value as "available" | "active")
          }
          className="rounded-lg"
        >
          {TABS.map(({ value, label }) => (
            <IonSegmentButton key={value} value={value} mode="md">
              <IonLabel className="text-black">{label}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        {filteredRooms && filteredRooms.length > 0 ? (
          <>
            <div className="space-y-2 py-4">
              {paginatedRooms.map((room: any, index: number) => (
                <div
                  key={room.id || index}
                  onClick={() => handleRoomClick(room.id)}
                >
                  <ScheduleCard
                    name={`ROOM ${room.name}` || "test"}
                    details={room.description || room.title || "test"}
                  />
                </div>
              ))}
            </div>

            {/* Numbered pagination UI (centered, max 5 buttons) */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center  space-x-2">
                <button
                  disabled={!hasPrevPage}
                  onClick={handlePrevPage}
                  className="p-2 disabled:opacity-50"
                  aria-label="Previous page"
                >
                  <IonIcon icon={chevronBack} />
                </button>

                <div className="flex space-x-1">
                  {pageButtons.map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`min-w-8 h-8 px-2 rounded ${
                        currentPage === pageNum
                          ? "font-bold "
                          : "bg-transparent"
                      }`}
                      aria-current={currentPage === pageNum ? "page" : undefined}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  disabled={!hasNextPage}
                  onClick={handleNextPage}
                  className="p-2 disabled:opacity-50"
                  aria-label="Next page"
                >
                  <IonIcon icon={chevronForward} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-4">
            <EmptyState />
          </div>
        )}

        <Footer className="" />
      </div>
    </div>
  );
};

export default Room;
