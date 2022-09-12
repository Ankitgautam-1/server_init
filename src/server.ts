import express, { Request, Response } from "express";
import cors from "cors";
import authRoute from "./routes/auth";
import helmet from "helmet";
import mongoose, { MongooseError } from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./interfaces/SocketConnections";
import mongoUrl, { port } from "./config/serverConfig";

const app = express();
dotenv.config();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(helmet({ noSniff: true }));
const httpServer = createServer();

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {},
});

mongoose
  .connect(mongoUrl, {})
  .then((mongoConnection: typeof mongoose) => {
    app.use(authRoute);
    app.listen(port, () => {
      console.log("Server is running on port :", port);
    });
    io.on("connect", (socket) => {
      console.log("socket", socket);
    });
  })
  .catch((err: MongooseError) => {
    console.log("name:", err.name);
    console.log("message:", err.message);
  });
