import express from "express";
import db from "./config/database.js";
import cookieParser from "cookie-parser";
// import Users from "./models/userModel.js";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("Database Berjalan Dengan Baik");
  //Create table sesuai models
  // await Users.sync();
} catch (error) {
  console.error(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log("Server Berjalan di Port 5000"));
