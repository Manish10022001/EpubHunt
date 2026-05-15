import { model, Model, Schema } from "mongoose";
import { hashSync, compareSync, genSaltSync } from "bcrypt";
import bcrypt from "bcrypt";
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
    default: Date.now,
    expires: 60 * 60 * 24,
  },
});

//1.whenever going to create and save token, want to hash the value so
verificationTokenSchema.pre("save", async function () {
  //only when token in modified
  // if (this.isModified("token")) {
  //   const salt = genSaltSync(10);
  //   this.token = hashSync(this.token, salt);
  // }
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, 10);
  }
}); //this is how we pass token

//2.now way to compare this token
//use .methods to add new method in already existing method
verificationTokenSchema.methods.compare = function (token: string) {
  // return compareSync(token, this.token); //returns boolean value
  return bcrypt.compare(token, this.token);
};

const verificationTokenModel = model(
  "VerificationToken",
  verificationTokenSchema
); //model(name, type of data want to store);

export default verificationTokenModel;
