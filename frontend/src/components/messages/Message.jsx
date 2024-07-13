import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

export default function Message({ message }) {
  const { authUser } = useAuthContext(); //BUG: keep console logging this and authenticatedUser as error might be there
  const { selectedConversation } = useConversation();
  const { data: authenticatedUser } = authUser;
  console.log("authenticated User ", authenticatedUser);
  console.log("auth user", authUser);
  //NOTE:IMPORTANT CONSOLE LOGS
  // console.log("message data ", message);
  // console.log(" selectedConversation ", selectedConversation);
  const fromMe = message.senderId === authUser?._id;
  // console.log("from me is ", fromMe, " for ", message.message);
  // console.log(
  //   "message senderId",
  //   message.senderId,
  //   " authUserId ",
  //   authUser?._id
  // );

  const userPic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const formattedTime = extractTime(message.createdAt);
  const chatBubbleClass = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatBubbleClass}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={userPic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>
        {formattedTime}
      </div>
    </div>
  );
}
