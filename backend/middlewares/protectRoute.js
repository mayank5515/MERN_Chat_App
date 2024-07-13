import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protect = async (req, res, next) => {
  try {
    //GET JWT (FROM HEADERS.AUTHORIZATION? like bearer token ?) NO
    // 1) GET JWT FROM COOKIES
    const token = req.cookies.jwt;
    // console.log("TOKEN FROM PROTECT ROUTE", token);
    if (!token) {
      return res
        .status(401)
        .json({ status: "fail", error: "Unauthorized - No Token Provided" });
    }
    // 2) VERIFY THE TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //will give payload or id //also promisify this function if u are going to refactor project accodring to jonas methods
    if (!decoded) {
      return res
        .status(401)
        .json({ status: "fail", error: "Unauthorized - Invalid Token" });
    }
    // console.log("decoded ", decoded);
    // 3) CHECK IF USER FOR THIS TOKEN EXISTS OR NOT
    const user = await User.findById(decoded.id);
    // console.log("USER FROM PROTECT", user);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "User belonging to this token doesnot exist!",
      });
    }

    //SEND USER INFO BACK
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error 😵",
      error: err,
      stack: err.stack,
    });
  }
};
