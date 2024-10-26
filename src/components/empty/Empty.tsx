const Empty = () => {
  return (
    <div className="flex items-center  text-center border h-full w-full dark:border-gray-700">
      <div className="flex flex-col gap-2 w-full max-w-sm px-4 mx-auto">
        <div className="p-4 mx-auto text-[#7b61ff] bg-[#7b61ff]/30 rounded-full dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
        </div>
        <h1 className="mt-3 text-lg font-semibold text-gray-800 dark:text-white">
          No Member Yet
        </h1>
        <h1 className="mt-3 text-lg text-gray-800 dark:text-white">
          You are the only bible some unbeliever will ever read
        </h1>

        <button className="text-black flex gap-1 border text-sm  border-[#7b61ff] mx-auto bg-[#7b61ff]/30 font-semibold  px-4 py-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 my-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Join Group
        </button>
      </div>
    </div>
  );
};

export default Empty;
