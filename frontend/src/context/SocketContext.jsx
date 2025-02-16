import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const { authUser } = useAuthContext();
  useEffect(() => {
    if (authUser) {
      console.log("authUser", authUser);
      const socket = io("https://chat-app-mayank-e4qn.onrender.com", {
        query: {
          userId: authUser._id,
        },
        transports: ["websocket", "polling"],
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        console.log("ONLINE USERS: ", users);
        setOnlineUsers(users);
      });

      //clean up function
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
