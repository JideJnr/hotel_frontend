import { IonIcon } from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import dayjs from "dayjs";

interface DateHeaderProps {
  currentDate: dayjs.Dayjs;
  setCurrentDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}

const DateHeader: React.FC<DateHeaderProps> = ({ currentDate, setCurrentDate }) => {
  const handlePrev = () => setCurrentDate(currentDate.subtract(1, "day"));
  const handleNext = () => setCurrentDate(currentDate.add(1, "day"));

  const formatted = currentDate.format("DD MMM, YYYY");
  const isToday = currentDate.isSame(dayjs(), "day");

  return (
    <div className="flex items-center justify-between rounded-xl">
      <p className="text-gray-800 font-semibold">
        {isToday ? "Today" : currentDate.format("dddd")},{" "}
        <span className="text-gray-600 font-medium">{formatted}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="p-1 rounded-md  transition border border-gray-800 shadow-sm"
        >
          <IonIcon icon={chevronBackOutline} className="text-lg text-gray-600 justify-center" />
        </button>
        <button
          onClick={handleNext}
          className="p-1 rounded-md  transition border border-gray-600 shadow-sm"
        >
          <IonIcon icon={chevronForwardOutline} className="text-lg text-gray-600 " />
        </button>
      </div>
    </div>
  );
};

export default DateHeader;
