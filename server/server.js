import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/authRoute.js";
import userRouter from "./src/routes/userRoute.js";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./src/routes/uploadThingRoute.js";
import postRouter from "./src/routes/postRoute.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://user-authentication-frontend-6460.onrender.com",
];
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on ports ${PORT}`);
});
