import "dotenv/config";
import mongoose, { Error, mongo } from "mongoose";
//1-> db connection created
//2-> import in index.ts, create connect.ts in that call dbConnect and import connect in index.ts
const uri = process.env.MONGO_URI;
if (!uri) throw new Error("Database uri is missing");

//mongoose connection
export const dbConnect = () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("db connected");
    })
    .catch((error) => {
      console.log("db connection failed", error.message);
    });
};
