import type { Request, RequestHandler, Response } from "express"; //or can directly use RequestHandler for type, so we do not need request and response
import crypto from "crypto";
import verificationTokenModel from "@/models/verificationToken.js";
import userModel from "@/models/user.js";
import nodemailer from "nodemailer";

export const generateAuthLink: RequestHandler = async (req, res) => {
  //Generate authentication link
  //and send that link to the users email address

  /*
    1.Generate Unique token for every users
    2.Store that token securely inside the database, so we can validate it in future.
    3. Create a link which include that secure token and user information
    4. Send that link to users email address.
    5. Notify user to look inside the email to get the login link
  */

  //2. t o store
  //2.2
  //we have email in validator,in req.body, so find user if in req.body
  const { email } = req.body;
  //now find email coming from req.body
  let user = await userModel.findOne({ email });
  //if there is no user, then it will return null, so we create a new user if it do not exist
  if (!user) {
    //if no user found create new user. so generate-link route will work for both sign in and signup
    user = await userModel.create({ email });
  }

  const userId = user._id;
  //3. if we already have token for this user, it will remove that first and add new one
  await verificationTokenModel.findOneAndDelete({ userId });
  const randomToken = crypto.randomBytes(36).toString("hex"); //it creates random token
  //2.1
  await verificationTokenModel.create({
    userId: user._id,
    token: randomToken,
  });

  //4.1 -> created transporter
  const transport = nodemailer.createTransport({
    // host: "smtp-relay.brevo.com",
    // port: 587,
    // secure: false,
    // auth: {
    //   user: "ab9280001@smtp-brevo.com",
    //   pass: "apfm3H1kM5w0Ehgx",
    // },
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  //2.3 create link
  const link = `http://localhost:8000/verify?token=${randomToken}&userId=${userId}`;
  //2.2 compose email objecgtjj
  await transport.sendMail({
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: "Auth Verification",
    html: `
      <div>
        <p>Please click on <a href="${link}"> this link</a> to verify your account.</p>
      </div>
    `,
  });
  console.log(req.body);
  res.json({ message: "Please check your mail" });
};
