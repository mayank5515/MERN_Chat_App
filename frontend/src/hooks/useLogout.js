import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/logout");
      console.log("res from logout", res); //

      if (res.data) {
        localStorage.removeItem("chat-app-user");
        setAuthUser(null);
        toast.success(res.data.message);
      }
    } catch (err) {
      if (err.response) {
        console.log("ERROR FROM useLogout", err);
        toast.error(err.response.data.message);
      } else toast.error(`ERROR : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};
export default useLogout;

// {data: {…}, status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…}, …}
// config
// :
// {transitional: {…}, adapter: Array(3), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
// data
// :
// {status: 'success', message: 'Logged Out Successfully'}
// headers
// :
// AxiosHeaders {access-control-allow-origin: '*', connection: 'close', content-length: '56', content-type: 'application/json; charset=utf-8', date: 'Thu, 11 Jul 2024 19:14:21 GMT', …}
// request
// :
// XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
// status
// :
// 200
// statusText
// :
// "OK"
// [[Prototype]]
// :
// Object
