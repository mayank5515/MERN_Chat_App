import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import toast from "react-hot-toast";
const useGetMessages = () => {
  const { selectedConversation, setMessages, messages } = useConversation();
  const [loading, setLoading] = useState(false);
  //   const [messageData,setMessageData]=useState("")
  useEffect(() => {
    async function getMessages() {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/messages/${selectedConversation._id}`
        );
        console.log("RES FROM GET MESSAGES", res);
        const data = res.data.data.data;
        if (data) {
          setMessages(data);
        }
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message);
        } else toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages, setLoading]); //functions donot change but why are they required?
  return { loading, messages };
};
export default useGetMessages;
