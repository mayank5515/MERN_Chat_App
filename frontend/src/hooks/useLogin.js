import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async ({ userName, password }) => {
    setLoading(true);
    try {
      //
      const success = handleLoginErrors(userName, password);
      if (!success) return;
      const res = await axios.post("/api/auth/login", { userName, password });
      console.log("RES FROM LOGIN: ", res);
      const data = res.data.data;
      console.log("DATA FROM LOGIN ", data);
      if (data) {
        //store in local storage
        localStorage.setItem("chat-app-user", JSON.stringify(data)); //FIX: it should be "data" in useSignup and here too as in local storage key : data:{....}
        //setAuth user so can navigate accordingly
        setAuthUser(data);
      }
      toast.success("Logged in successfully 🎉");
    } catch (err) {
      console.log("ERROR FROM LOGIN: ", err);
      if (err.response) {
        toast.error(err.response.data.message, "💥");
      } else toast.error(`ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};
export default useLogin;

function handleLoginErrors(userName, password) {
  if (!userName || !password) {
    toast.error("Please provide username and password! 🙄");
    return false;
  }
  if (password.length < 8) {
    toast.error("Password should be of atleast 8 length 😰");
    return false;
  }
  return true;
}
