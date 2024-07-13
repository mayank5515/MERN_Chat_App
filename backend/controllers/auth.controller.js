import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res, next) => {
  try {
    const { fullName, userName, password, passwordConfirm, gender } = req.body;

    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = await User.create({
      fullName,
      userName,
      password,
      passwordConfirm,
      gender,
      profilePic:
        gender.toLowerCase() === "boy" || gender.toLowerCase() === "male"
          ? boyProfilePicture
          : girlProfilePicture,
    });
    //MODEL WILL HANDLE HASHING PART
    //GENERATE JWT
    generateTokenAndSetCookie(newUser._id, res);
    newUser.password = undefined; //sensitive data
    newUser.userName = undefined; //sensitive data //donot undefine ._id we will need it
    res.status(201).json({
      status: "success",
      data: {
        data: newUser,
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
export const login = async (req, res, next) => {
  try {
    //CHECK IF USERNAME AND PASSWORD IS PROVIDED
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide username and password",
      });
    }

    //CHECK IF USER EXISTS WITH USERNAME AND PASSWORD IS CORRECT OR NOT
    const user = await User.findOne({ userName }).select("+password");
    // const something = await user.correctPassword(password, user.password);
    // console.log("something", something);
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid username or password !" });
    }

    //GENERATE JWT AND SEND IT BACK
    generateTokenAndSetCookie(user._id, res);

    //FIX: personally i woudlnt send users info while logging in , i will send jwt and thats it , and from there i will try to make front end side protected routes (authorization etc)
    //sensitive data //donot undefine _id we will need it
    user.password = undefined;
    user.userName = undefined;

    //
    res.status(200).json({
      status: "success",
      message: "LOGIN SUCCESSFUL , JWT TOKEN SENT AS COOKIE !",
      data: user,
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
export const logout = async (req, res, next) => {
  try {
    //PRETTY SIMPLE RIGHT?
    res.cookie("jwt", "", {
      maxAge: 0,
    });

    res
      .status(200)
      .json({ status: "success", message: "Logged Out Successfully" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error 😵",
      error: err,
      stack: err.stack,
    });
  }
};

//openssl rand -base64 32
