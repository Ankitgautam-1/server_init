"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const authSchema_1 = __importDefault(require("../schemaValidation/authSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const email = req.body.email;
    const password = req.body.password;
    console.log("email:", email, " password", password);
    try {
        const validation = authSchema_1.default.validate(req.body);
        console.log("validation", validation);
        if (!validation.error) {
            const user = yield userModel_1.default.findOne({
                email: validation.value.email,
            });
            if (user) {
                console.log("validation.value.password:", validation.value.password, "user.password:", user.password);
                bcrypt_1.default.compare(validation.value.password, (_a = user.password) !== null && _a !== void 0 ? _a : "", (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!result) {
                        res.status(403).send({
                            ok: false,
                            error: "incorrect password",
                        });
                    }
                    else {
                        res.status(201).json({ ok: true, user: user });
                    }
                }));
            }
            else {
                res.status(400).send({ ok: false, message: "user not found" });
            }
        }
        else {
            if (validation.error.isJoi === true) {
                res.status(400).send({
                    ok: false,
                    error: validation.error.details[0].message,
                });
            }
            else {
                res.status(400).send({ ok: false, error: validation.warning });
            }
        }
    }
    catch (error) {
        if (error.isJoi === true) {
            res.status(400).send({
                ok: false,
                error: error.details[0].message,
            });
        }
        else {
            res.status(400).send({ ok: false, error: "user not found" });
        }
    }
});
exports.signIn = signIn;
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
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    console.log("email:", email, " password", password);
    try {
        const validation = authSchema_1.default.validate(req.body);
        console.log("validation", validation);
        if (!validation.error) {
            const user = yield userModel_1.default.findOne({
                email: validation.value.email,
            });
            console.log("user", user);
            if (user != null) {
                res
                    .status(400)
                    .send({ ok: false, message: "user already exist with same email" });
            }
            else {
                const passwordCrpyt = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield userModel_1.default.create({
                    email: validation.value.email,
                    password: passwordCrpyt,
                });
                newUser.save();
                res.status(201).send({ ok: true, user: newUser });
            }
        }
        else {
            if (validation.error.isJoi === true) {
                res.status(400).send({
                    ok: false,
                    error: validation.error.details[0].message,
                });
            }
            else {
                res.status(400).send({ ok: false, error: validation.warning });
            }
        }
    }
    catch (error) {
        if (error.isJoi === true) {
            res.status(400).send({
                ok: false,
                error: error.details[0].message,
            });
        }
        else {
            res.status(400).send({ ok: false, error: "user not found" });
        }
    }
});
exports.signUp = signUp;
