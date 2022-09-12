"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoUrl = (_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : "";
const port = process.env.PORT;
exports.port = port;
exports.default = mongoUrl;
