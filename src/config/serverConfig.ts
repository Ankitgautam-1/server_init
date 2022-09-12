import dotenv from "dotenv";
dotenv.config();
const mongoUrl = process.env.MONGO_URL ?? "";
const port = process.env.PORT;

export default mongoUrl;
export { port };
