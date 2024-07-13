import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import { getReceiverSockedId } from "../socket/socket.js";
import { io } from "../socket/socket.js";
export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    //IN PARAMS logged in user will send :id of receiving user
    const { id: receiverId } = req.params;
    //logged in user id
    const senderId = req.user._id;
    //check if convo exists for these two ids
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    //if no create a convo
    if (!conversation) {
      //maybe first time
      //this will also save in db for current fields provided
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    //this wont save in data base
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id); //i think it should be update
    }

    //SAVE TO DATABASE
    // await conversation.save(); first this will run
    // await newMessage.save(); then this (sync nature)

    //will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    //SOCKET IO FUNCTIONALITY WILL GO HERE

    const receiverSocketId = getReceiverSockedId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    //send newMessage as json
    res.status(201).json({
      status: "success",
      data: {
        data: newMessage,
      },
    });
    //
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error 😵",
      error: err,
      stack: err.stack,
    });
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    // console.log("from get messages", userToChatId, "---", senderId);
    //BASICALLY WE CANT SEARCH FOR ALL THE MESSAGES NA (WE CAN BUT THEY WONT BE IN ORDER)
    //INSTEAD SEARCH FOR CONVERSATION WITH SAME SENDER AND RECEIVER AS PARTICIPANTS AND WE CAN POPULATE THEM WHILE FETCHING

    //NOTE: DO I NEED TO MAKE SURE THE PARAMS VALUE(USER ID) EXISTS IN DATABASE?
    const receivingUser = await User.findById(userToChatId);
    if (!receivingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Id provided in params does not exist for any user!",
      });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    // console.log("CONVERSATION FROM GET: ", conversation); //if convo ===null then error
    if (!conversation) {
      return res.status(200).json({
        status: "success",
        data: {
          data: [],
        },
      });
    }
    const messages = conversation.messages;
    //
    res.status(200).json({
      status: "success",
      results: messages.length,
      data: {
        data: messages,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error 😵",
      error: err,
      stack: err.stack,
    });
  }
};
