import express from "express";
import { signIn, signUp } from "../controller/authController";
const authRoute = express.Router();
authRoute.post("/api/v1/signin", signIn).post("/api/v1/signup", signUp);
export default authRoute;
