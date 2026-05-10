import { generateAuthLink } from "@/controllers/auth.js";
import { Router } from "express";

const authRouter = Router();

//did not give "/auth/" as we have prefixed it, the create new folder controller to store business logic
authRouter.post(
  "/generate-link",
  //middleware for validation
  (req, res, next) => {
    const { email } = req.body;
    const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");

    if (!regex.test(email)) {
      //sending error response
      return res.status(422).json({ error: "Invalid Email" });
    }
    //john@gmail.com
    next();
  },
  generateAuthLink
);

export default authRouter;
