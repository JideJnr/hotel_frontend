import { useIonRouter } from "@ionic/react";
import { ChevronLeft } from "lucide-react";

interface FormHeaderProps {

  backUrl?: string;
  className?: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  
  backUrl,
  className = ""
}) => {
  const router = useIonRouter();

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl, "back", "push");
    } else {
      router.goBack();
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${className} bg-white p-4 shadow-md border-white`}>
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
       
      </div>
    </div>
  );
};