import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/authRouter.js";
import PublicRouter from "./src/routers/publicRouter.js"
import UserRouter from "./src/routers/userRouter.js"
import morgan from "morgan";// gives error,or any log data in terminal
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "http://localhost:5173" ,credentials:true}));

app.use(express.json());
app.use(cookieParser()); // read cookie from be req.
app.use(morgan("dev"));


app.use("/auth", AuthRouter);
app.use("/public",PublicRouter)
app.use("/user",UserRouter);

app.get("/", (req, res) => {
  console.log("Server is working");
});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Sever Error";
  const StatusCode = err.statusCode || 500;

  res.status(StatusCode).json({ message: ErrorMessage });
  
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server started at port:", port);
  connectDB();
});
