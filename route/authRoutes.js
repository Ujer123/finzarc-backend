import express from "express";
import { register, login, logout, getUser } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/data', getUser)

export default authRouter;