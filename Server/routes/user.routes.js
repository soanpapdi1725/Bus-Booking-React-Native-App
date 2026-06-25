import express, { Router } from "express";

import {
  loginOrSignupGoogle,
  refreshToken,
} from "../cotrollers/user.controller.js";

const authRouter = express.Router();

authRouter.post("/signin", loginOrSignupGoogle);
authRouter.post("/refresh", refreshToken);

export default authRouter;
