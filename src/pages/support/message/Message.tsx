import React, { useEffect, useRef } from "react";
import { useMessages } from "../../../context/messageContext";
import { auth } from "../../../../firebase";

const Message = () => {
  const { messages, dataLoading, loadMoreMessages, setFilter } = useMessages();

  const scrollRef = useRef();
  const id = auth.currentUser?.uid;

  return (
    <div>
      <div className="pb-15 overflow-y-auto border-[#eee]">
        {messages.length <= 0 && (
          <div className="flex h-4 w-4 mt-auto mb-3">
            <p className="flex mt-5 p-5 text-sm">
              Please Type a message to get started
            </p>
          </div>
        )}
        {messages.map((message) => (
          <>
            <div className="w-full flex">
              {message?.from !== id && (
                <div className="flex h-4 w-4 mt-auto mb-3"></div>
              )}
              <div
                className={` ${message?.from !== id ? "w-fit bg-gray-500 rounded-l-2xl rounded-tl-2xl" : "w-fit ml-auto bg-green-500 rounded-xl "} flex p-2 m-2 max-w-[350px] flex-col`}
              >
                <p>
                  {message.msg}
                  <br />
                  <small></small>
                </p>
              </div>
              {message?.from === id && (
                <div className="flex h-4 w-4 mt-auto mb-3"></div>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Message;
