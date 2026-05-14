import { model, Schema } from "mongoose";
import { trim } from "zod";
import { required } from "zod/mini";
//2. schema; type of data
const userSchema = new Schema({
  name: {
    type: String,
    trim: true, //remove whitespaces
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true, //different for each user
  },
  role: {
    type: String,
    enum: ["user", "author"], //used enum, so to specify one of these can be there
    default: "user",
  },
});
//1: create model
const userModel = model("User", userSchema);

export default userModel;
