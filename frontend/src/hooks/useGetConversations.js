import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/users");
        // console.log("RES FROM GET CONVERSATIONS: ", res);
        const usersForSidebar = res.data.data.data;
        if (usersForSidebar) {
          //   console.log("users for sidebars", usersForSidebar);
          setConversations(usersForSidebar);
        }
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return { loading, conversations };
};
export default useGetConversations;
