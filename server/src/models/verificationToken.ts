import { model, Model, Schema } from "mongoose";
import { required } from "zod/mini";
// 1.Created schema where we are going to have userid, token, expires;
//   userId and token are set to required:true, so these are required to create token without it will give error
const verificationTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, //as object instead of string, so it gives random number
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  //this token will expire after 24 hr of email
  expires: {
    type: Date,
    default: Date.now(),
    expires: 60 * 60 * 24,
  },
});

const verificationTokenModel = model(
  "VerificationToken",
  verificationTokenSchema
); //model(name, type of data want to store);

export default verificationTokenModel;
