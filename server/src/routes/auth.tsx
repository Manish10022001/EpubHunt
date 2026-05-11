import { generateAuthLink } from "@/controllers/auth.js";
import { emailValidationSchema, validate } from "@/middlewares/validator.js";
import { Router, type RequestHandler } from "express";

const authRouter = Router();

//did not give "/auth/" as we have prefixed it, the create new folder controller to store business logic
authRouter.post(
  "/generate-link",
  validate(emailValidationSchema.shape),
  generateAuthLink
);

export default authRouter;
