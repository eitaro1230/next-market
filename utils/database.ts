import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // MongoDB接続
    await mongoose.connect(
      "mongodb+srv://monotein:mVvCZQVHRtrk83dZ@cluster0.xtob8yb.mongodb.net/appDataBase?retryWrites=true&w=majority"
    );
    console.log("Success Connected to MongoDB");
  } catch (err) {
    // MongoDB接続失敗
    console.log("Failure Unconnected to MongoDB");
    throw new Error();
  }
};

export default connectDB;
