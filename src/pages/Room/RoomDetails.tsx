import Button from "../../components/button/button";

const RoomDetails = () => {

    const data = null;
 
  return (
    <>
    <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-3 border-b py-6 text-xs">
          <p className="flex justify-between">
            <span className="text-gray-400">Room No.:</span>
            <span>Room {data?.id}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span>{data?.status}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Short Rest Price:</span>
            <span>{data?.shortRest}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Lodge Price:</span>
            <span>{data?.lodge}</span>
          </p>
        </div>

        <div className="flex flex-col gap-4 px-4 py-8">
          {data && data?.currentGuest && (
            <>
              <p>Current Guest</p>
              <div className="w-full text-left">
                <img />
                <p>{data.currentGuest.name}</p>
              </div>

              <div className="border-b border-dashed"></div>

              <p>Code Status : Available for cleaning</p>

              <div className="border border-black px-4 py-2 rounded-md text-md font-semibold">
                <p className="text-center">
                  Access Codes :<span> Agsgsba</span>
                </p>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 gap-2">
            {data?.status === "active" ? (
              <>
               
                  <Button
                    text="Checking Out"
                    className="w-full" 
                    loadingText="Checking Out ..."
                  />
              
                  <Button
                    text="Ask To Check Out"
                    className="w-full"
                    loadingText="Checking Out ..."
                  />
             
              </> ):
              (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
