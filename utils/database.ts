import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //////////////////////////////////////////////////
    // MongoDB接続成功
    //////////////////////////////////////////////////
    await mongoose.connect(process.env.MONGO_DB_URI!);
    console.log("Success Connected to MongoDB");
  } catch (err) {
    //////////////////////////////////////////////////
    // MongoDB接続失敗
    //////////////////////////////////////////////////
    console.log("Failure Unconnected to MongoDB");
    throw new Error();
  }
};

export default connectDB;
