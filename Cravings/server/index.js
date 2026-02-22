import express from "express";
import cors from "cors";
import cloudinary from "./src/config/cloudinary.js";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/authRouter.js";
import PublicRouter from "./src/routers/publicRouter.js";
import RiderRouter from './src/routers/riderRouter.js'
import UserRouter from "./src/routers/userRouter.js";
import RestaurantRouter from "./src/routers/restaurantRouter.js"
import morgan from "morgan"; // gives error,or any log data in terminal
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser()); // read cookie from be req.
app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);
app.use("/user", UserRouter);
app.use("/restaurant", RestaurantRouter);
app.use("/rider", RiderRouter);

app.get("/", (req, res) => {
  console.log("Server is working");
});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Sever Error";
  const StatusCode = err.statusCode || 500;

  res.status(StatusCode).json({ message: ErrorMessage });
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log("server started at port:", port);
  connectDB();
  try {
    const res = await cloudinary.api.ping();
    console.log("Cloudinary API is Working:", res);
  } catch (error) {
    console.error(" Error Connecting Cloudinay API:", error);
  }
});
