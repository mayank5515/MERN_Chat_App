import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { protect } from "../middlewares/protectRoute.js";
const router = express.Router();

router.get("/:id", protect, getMessages);
router.post("/send/:id", protect, sendMessage); //id will be senders id (one who is sending?)
//or is it one who it is being sent to /////// thisssssss //as we can get sendersId from protect middleware as they need to be logged in to send message

export default router;
