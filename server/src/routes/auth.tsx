import { generateAuthLink } from "@/controllers/auth.js";
import { Router } from "express";

const authRouter = Router();
//did not give "/auth/" as we have prefixed it, the create new folder controller to store business logic
authRouter.post("/generate-link", generateAuthLink);

export default authRouter;
