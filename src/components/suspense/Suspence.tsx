function Suspence() {
  return (
    <div className="flex w-screen h-screen bg-white ">
      <div className="flex-col mx-auto my-auto ">
        <div className="flex mx-auto flex-col gap-4">
          <img
            src="assets/images/bjimage.png"
            alt="logo"
            className="h-12 w-fit px-5 mx-auto"
          />
          <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-emerald-400 rounded-full dark:text-emerald-500 mx-auto" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
        </div>
      </div>
    </div>
  );
}

export default Suspence;
