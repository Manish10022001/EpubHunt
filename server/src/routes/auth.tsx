import { generateAuthLink } from "@/controllers/auth.js";
import { Router } from "express";
import { z } from "zod";

const authRouter = Router();

//create schema
const schema = z.object({
  email: z.string({
  }).email("Zod says it is invalid"),
});
//did not give "/auth/" as we have prefixed it, the create new folder controller to store business logic
authRouter.post(
  "/generate-link",
  //middleware for validation
  (req, res, next) => {
    const { email } = req.body;
    // const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
    // if (!regex.test(email)) {
    //   //sending error response
    //   return res.status(422).json({ error: "Invalid Email" });
    // }

    const result = schema.safeParse(req.body);
    if (!result.success) {
      console.log(JSON.stringify(result));
      const errors = result.error.flatten().fieldErrors;
      return res.status(422).json(errors);
    }
    //john@gmail.com
    next();
  },
  generateAuthLink
);

export default authRouter;
