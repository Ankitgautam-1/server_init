import express, { NextFunction } from "express";
import { Request, Response } from "express";
const authRoute = express.Router();

authRoute.post("/login", (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  console.log("email:", email, " password", password);
  if (
    email === undefined ||
    email.trim() === "" ||
    email === null ||
    password === undefined ||
    password.trim() === "" ||
    password === null
  ) {
    next();
  }
  res.send("login");
});
export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.headers.authorization?.toString()!;
  console.log("token:", token);
  res.send("authorization");
};
export const test = (req: Request, res: Response, next: NextFunction) => {
  console.log("test");
  res.send("test");
};
authRoute.post("/register", (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  console.log("email:", email, " password", password);
  if (
    email === undefined ||
    email.trim() === "" ||
    email === null ||
    password === undefined ||
    password.trim() === "" ||
    password === null
  ) {
    return res.status(402).json({
      ok: false,
      message: "Please provide email and password",
    });
  }
  res.send("register");
});

export default authRoute;
