import express from "express";
import { mongoDBURL } from "./config/dbconfig";
import mongoose from "mongoose";

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// import { router as usersRouter } from "./routes/users.js";
import { router as productsRouter } from "./routes/productRoutes";
import {router as userAuthRouter} from "./routes/userRoutes";

// app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.use("/api/users",userAuthRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
