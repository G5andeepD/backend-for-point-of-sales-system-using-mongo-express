import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
