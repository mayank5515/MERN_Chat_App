import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    console.log("message from sendmessage", message);
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        { message }
      );
      console.log("RES FROM SEND MESSAGE", res);
      const data = res.data.data.data;
      console.log("data FROM SEND MESSAGE", data);
      // const messageData = data.message;
      // console.log("messageData FROM SEND MESSAGE", messageData);
      if (data) {
        setMessages([...messages, data]); //it's an array
      }
    } catch (err) {
      console.log("ERROR FROM SEND MESSAGE ", err);
      if (err.response) toast.error(err.response.data.message);
      else toast.error(`ERROR : ${err}`);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};
export default useSendMessage;
