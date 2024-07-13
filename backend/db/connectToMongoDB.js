import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    const DB_PASSWORD = process.env.DATABASE_PASSWORD;
    const DB = process.env.DATABASE.replace("<PASSWORD>", DB_PASSWORD);
    await mongoose.connect(DB);
    console.log("Connection to DATABASE successfull!");
  } catch (err) {
    console.log("ERROR OCCURED WHILE CONNECTING TO DATABASE", err);
  }
};
export default connectToMongoDB;

// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
