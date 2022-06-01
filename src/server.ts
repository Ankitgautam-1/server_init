import express, { Request, Response } from "express";
import cors from "cors";
import authRoute, { authorization, test } from "./routes/auth";
import helmet from "helmet";
const PORT = 3001;
const app = express();
app.use(cors());
app.use(helmet({ noSniff: true }));
app.use(
  express.json({
    limit: "10mb",
  })
);
app.use("/api/auth", authRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Server is up");
});
app.get("/api/getData", test, (req: Request, res: Response) => {
  res.send("getData");
});

app.listen(PORT, () => {
  console.log(`Server started at port http://localhost:${PORT}`);
});
