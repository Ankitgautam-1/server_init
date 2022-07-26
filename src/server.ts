import express, { Request, Response } from "express";
import cors from "cors";
import authRoute from "./routes/auth";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(helmet({ noSniff: true }));

const mongourl = process.env.MONGO_URL ?? "";

const port = process.env.PORT;
const db = process.env.DB_NAME;
const options = {
  dbName: db,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(mongourl, options)
  .then((con) => {
    app.get("/", async (req, res) => {
      res.send({ ok: true, message: "server is online" });
    });
    // console.log("connection", con);
    app.use(authRoute);
    app.listen(port, () => {
      console.log("Server is online port:", `http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("connection Error", err);
  });
