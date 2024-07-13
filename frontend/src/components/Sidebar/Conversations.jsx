import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
export default function Conversations() {
  const { loading, conversations } = useGetConversations();
  // console.log("from conversations react component: ", conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : (
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastId={idx === conversations.length - 1}
          />
        ))
      )}
    </div>
  );
}
