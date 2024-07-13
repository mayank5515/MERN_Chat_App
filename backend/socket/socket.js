import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = http.createServer(app); //creating socket io server on top of our express server

const io = new Server(server, {
  cors: {
    origin: ["*"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; //{userId:socketId}

export const getReceiverSockedId = (receiverId) => {
  return userSocketMap[receiverId]; //will give socket id
};
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId; //this is coming from client
  console.log("userId from backend ", userId);
  if (userId != "undefined") userSocketMap[userId] = socket.id; //whenever any user logs in ya sign up , we will know who is online or offline
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //socket.on() is used to listen to events and can be used at both client and server side
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
