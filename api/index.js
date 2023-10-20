import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connect");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000);

app.get("/test", (req, res) => {
  try {
    res.json("Hello World!");
  } catch (error) {
    console.log(err);
  }
});
app.post("/login", userRouter);
app.post("/register", userRouter);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const msg = err.message || "Internal Server Error";
  res.status(status).json({
    success: false,
    statusCode: status,
    message: msg,
  });
});
