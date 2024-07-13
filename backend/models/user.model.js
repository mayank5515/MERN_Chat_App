import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
      maxLength: 30,
    },
    userName: {
      type: String,
      unique: true,
      required: [true, "Please provide your username!"],
      maxLength: 25,
    },
    gender: {
      type: String,
      enum: ["boy", "girl", "Boy", "Girl", "male", "female", "Male", "Female"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide confirm password!"],
      minLength: 8,
      validate: {
        //WILL ONLY RUN FOR CREATE AND SAVE
        validator: function (passwordConfirm) {
          return passwordConfirm === this.password;
        },
        message: "Passwords donot match!",
      },
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    //createdAt , updatedAt -> we can use to display "user since"->createdAt
    timestamps: true,
  }
);

//WILL ONLY RUN FOR CREATE AND SAVE
UserSchema.pre("save", async function (next) {
  console.log("THIS FROM MODEL", this);
  console.log(
    "password and confirm password",
    this.password,
    "---",
    this.passwordConfirm
  );

  if (!this.isModified("password")) return next(); //as we want to hash password when it is modified , but if it is not simply return (there might be case where document is updated but password was not modified)
  this.password = await bcryptjs.hash(this.password, 12);
  this.passwordConfirm = undefined;
  console.log("hashed password", this.password);
  next();
});

//COMPARE PASSWORD
UserSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword
) {
  return bcryptjs.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", UserSchema);
export default User;
