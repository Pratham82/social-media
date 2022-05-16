import mongoose from "mongoose";
import { connectionOptions } from "./mongooseOptions";

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected ✅");
    return;
  }
  mongoose.connect(
    process.env.MONGO_URI as string,
    connectionOptions as mongoose.ConnectOptions,
    (err) => {
      if (err) throw err;
      console.log("DataBase is connected ✅");
    },
  );
};

export default connectDB;
