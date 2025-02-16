import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
export default function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  //NOTE:AS THESE ARE GLOBAL STATE , THEREFORE THEY PERSIST EVEN IF USER LOG OUTS, SO set this state back to null
  //NOTE: how to do something , when component unmounts
  useEffect(() => {
    //CLEAN UP FUNCTION
    return () => setSelectedConversation(null);
  }, []);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      <>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <div className="bg-slate-500 px-4 py-2 mb-2">
              <span className="label-text">To:</span>{" "}
              <span className="text-gray-900 font-bold">
                {selectedConversation.fullName}
              </span>
            </div>
            <Messages />
            <MessageInput />
          </>
        )}
      </>
    </div>
  );
}
const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄️</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
