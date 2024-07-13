import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import { app, server, io } from "./socket/socket.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

//
dotenv.config();

const __dirname = path.resolve();

//MIDDLEWARES
app.use(express.json()); //parse incoming req for req body
app.use(cookieParser()); //parses incoming cookie

//ROUTES
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

//SERVER
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});

//NOTE: change message: to error: in catch blocks or refactor for globalErrorHandler
//NOTE:refactor at the end for better error handling
