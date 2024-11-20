import { CheckIcon } from "@heroicons/react/16/solid";

interface NoTaskProps {
  text: string;
}

const NoTask: React.FC<NoTaskProps> = ({ text }) => {
  return (
    <div className=" flex items-center  text-center h-full w-full ">
      <div className="flex flex-col gap-2 w-full h-fit  p-4 m-auto">
        <div className="p-4 mx-auto text-[#7b61ff] bg-[#7b61ff]/30 rounded-full dark:bg-gray-800">
          <CheckIcon className="size-6" />
        </div>

        <h1 className="mt-3 text-md text-gray-800 dark:text-white">{text}</h1>
      </div>
    </div>
  );
};

export default NoTask;
