"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const authRoute = express_1.default.Router();
authRoute.post("/api/v1/signin", authController_1.signIn).post("/api/v1/signup", authController_1.signUp);
exports.default = authRoute;
