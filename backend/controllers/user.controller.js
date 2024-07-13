import User from "../models/user.model.js";

export const getUsersForSidebars = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id; //logged in user id
    // console.log("are we logged in: ", req.user);
    // console.log("logged in user is ", loggedInUserId);
    const users = await User.find({ _id: { $ne: loggedInUserId } });

    // console.log("users from user controller: ", users);

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        data: users,
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
