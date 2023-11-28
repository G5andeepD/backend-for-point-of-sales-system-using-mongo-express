import express from "express";
import { mongoDBURL } from "./src/config/dbconfig.js";
import mongoose from "mongoose";

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

import { router as usersRouter } from "./src/routes/users.js";
import { router as productsRouter } from "./src/routes/products.js";
import {router as userAuthRouter} from "./src/routes/userRoutes.js";

app.use("/users", usersRouter);
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
