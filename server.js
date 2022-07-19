import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import morgan from "morgan";
import "express-async-errors";
dotenv.config();

//middleware import
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

//router import
import authRouters from "./routes/authRoute.js";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome");
});

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//routers
app.use("/api/v1/auth", authRouters);

//middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
