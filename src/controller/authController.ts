import express, { NextFunction } from "express";
import { Request, Response } from "express";
import Joi from "joi";
import UserModel from "../model/userModel";
import authSchema from "../schemaValidation/authSchema";
import bcrypt from "bcrypt";
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  console.log("email:", email, " password", password);
  try {
    const validation: Joi.ValidationResult<any> = authSchema.validate(req.body);
    console.log("validation", validation.value.password);

    if (!validation.error) {
      const user = await UserModel.findOne({
        email: validation.value.email,
      });

      if (user) {
        console.log(
          "validation.value.password:",
          validation.value.password,
          "user.password:",
          user.password
        );

        bcrypt.compare(
          validation.value.password,
          user.password ?? "",
          async (err, result) => {
            if (result) {
              res.status(200).json({ ok: true, user: user });
            } else {
              res.status(403).send({
                ok: false,
                error: "incorrect password!",
              });
            }
          }
        );
      } else {
        res.status(400).send({ ok: false, message: "user not found" });
      }
    } else {
      if (validation.error.isJoi === true) {
        res.status(400).send({
          ok: false,
          error: validation.error.details[0].message,
        });
      } else {
        res.status(400).send({ ok: false, error: validation.warning });
      }
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      res.status(400).send({
        ok: false,
        error: error.details[0].message,
      });
    } else {
      res.status(400).send({ ok: false, error: "user not found" });
    }
  }
};
// export const authorization = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token: string = req.headers.authorization?.toString()!;
//   console.log("token:", token);
//   res.send("authorization");
// };
// export const test = (req: Request, res: Response, next: NextFunction) => {
//   console.log("test");
//   res.send("test");
// };
const signUp = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  console.log("email:", email, " password", password);
  try {
    const validation: Joi.ValidationResult<any> = authSchema.validate(req.body);
    console.log("validation", validation);

    if (!validation.error) {
      const user = await UserModel.findOne({
        email: validation.value.email,
      });
      console.log("user", user);

      if (user != null) {
        res
          .status(400)
          .send({ ok: false, message: "user already exist with same email" });
      } else {
        const passwordCrpyt = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
          email: validation.value.email,
          password: passwordCrpyt,
        });
        newUser.save();
        res.status(201).send({ ok: true, user: newUser });
      }
    } else {
      if (validation.error.isJoi === true) {
        res.status(400).send({
          ok: false,
          error: validation.error.details[0].message,
        });
      } else {
        res.status(400).send({ ok: false, error: validation.warning });
      }
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      res.status(400).send({
        ok: false,
        error: error.details[0].message,
      });
    } else {
      res.status(400).send({ ok: false, error: "user not found" });
    }
  }
};
export { signUp, signIn };
