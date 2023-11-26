import express from "express";
import { mongoDBURL } from "./src/config/dbconfig.js";
import mongoose from "mongoose";

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

import { router as usersRouter } from "./src/routes/users.js";

app.use("/users", usersRouter);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
