import mongoose, { Document, Schema } from "mongoose";

interface UserAttributes {
  username: string;
  password: string;
  email: string;
}

export interface UserDocument extends Document, UserAttributes {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: 3,
      maxlength: 30,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: 3,
      maxlength: 30,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<UserDocument>("User", userSchema);
