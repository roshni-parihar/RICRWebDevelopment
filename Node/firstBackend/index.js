import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/config/db.js";

const app = express();

app.use(express.json()); // to encrypt the response of fetched data
app.use("/auth",AuthRouter);
import AuthRouter from "./src/routers/myRouter.js"


app.get("/", (req, res) => {
  console.log("server is running");
  res.json({ message: "server is running successfully" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server started at port", port);
  connectDB();
});
