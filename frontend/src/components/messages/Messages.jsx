import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import { useEffect, useRef } from "react";

export default function Messages() {
  const { loading, messages } = useGetMessages();
  useListenMessages(); //will listen for new messages
  console.log("messages from Messages react component", messages);

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto ">
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {/*  */}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start a conversation</p>
      )}
      {/*  */}
      {!loading &&
        messages.length > 0 &&
        messages.map((message, idx) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message key={message._id} message={message} />
          </div>
        ))}
    </div>
  );
}
