import { useState } from "react";
import { Home, User, Settings, Plus, House, Currency, Users, UserPlus, Banknote, BookOpen } from "lucide-react"; // example icons
import { useIonRouter } from "@ionic/react";

const FloatingMenu = () => {
    const router = useIonRouter();
    const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-12 right-6 flex flex-col items-end gap-3">
      {/* Expandable buttons */}
      {open && (
        <div className="flex flex-col gap-3 mb-2 transition-all">
          <button
                            onClick={() => router.push('/sales/stepone', 'forward')}
            className="p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
          >
            <Users size={20} />
          </button>
          <button
                            onClick={() => router.push('/register/customer/stepone', 'forward')}
            className="p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
          >
            <UserPlus size={20} />
          </button>
          <button
                onClick={() => router.push('/register/expenses/stepone', 'forward')}
            className="p-3 rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600"
          >
            <Banknote size={20} />
          </button>
                    <button
                onClick={() => router.push('/register/booking/stepone', 'forward')}
            className="p-3 rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600"
          >
            <BookOpen size={20} />
          </button>
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="p-4 rounded-full bg-cyan-700 text-white shadow-lg hover:bg-cyan-600 transition-transform"
      >
        <Plus size={20} className={`transition-transform ${open ? "rotate-45" : ""}`} />
      </button>
    </div>
  );
};

export default FloatingMenu;
