import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
function useSignup() {
  const [loading, setLoading] = useState(false);
  //NOTE: we are doing this to let app know a user is authenticated therefore configure routes accordingly (BASICALLY PROTECTED ROUTES)
  const { setAuthUser } = useAuthContext();
  //we will be passing this function
  const signup = async ({
    fullName,
    userName,
    password,
    passwordConfirm,
    gender,
  }) => {
    const success = handleInputErrors(
      fullName,
      userName,
      password,
      passwordConfirm,
      gender
    );
    if (!success) return;

    setLoading(true);
    try {
      //
      const res = await axios.post("/api/auth/signup", {
        fullName,
        userName,
        password,
        passwordConfirm,
        gender,
      });
      // const data = await res;
      console.log("RES: ", res);
      // console.log("DATA: ", data);
      console.log("sign up data from api :", res.data.data.data); //FIX: fix this shit brother
      const data = res.data.data.data;
      if (data) {
        //why are we setting it to local storage? as when component unmounts state does not remain , therefore default value of auth user is to fetch from localstorage if exists
        localStorage.setItem("chat-app-user", JSON.stringify(data)); //FIX: it should be "data" in useLogin and here too as in local storage key : data:{....}
        setAuthUser(data); // now go back to App.jsx
      }
    } catch (err) {
      if (err.response) {
        console.log("ERROR: ", err);
        console.log("response data", err.response.data);
        //   console.log("err response status", err.response.status);
        //   console.log("err response headers", err.response.headers);
        //   console.log("err response data message", err.response.data.message);
        toast.error(err.response.data.message);
      } else toast.error(`ERROR : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  return [loading, signup];
}

export default useSignup;

//check toast promise custom docs etc
function handleInputErrors(
  fullName,
  userName,
  password,
  passwordConfirm,
  gender
) {
  if (!fullName || !userName || !password || !passwordConfirm || !gender) {
    toast.error("Please fill in all the inputs 🙄");
    return false;
  }

  //CLIENT SIDE ERROR HANDLING
  if (password !== passwordConfirm) {
    toast.error("Passwords donot match 🚫");
    return false;
  }
  if (password.length < 8) {
    toast.error("Password is too short! 🧐");
    return false;
  }
  return true;
}
