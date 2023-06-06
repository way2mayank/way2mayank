import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./route/user.js";
import morgan from "morgan";

const app = express();
const PORT = 8000;

app.use(cors());

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/fluid3")
  .then((e) => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("/", userRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
