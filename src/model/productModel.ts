import mongoose, { Document, Schema } from "mongoose";

interface ProductAttributes {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export interface ProductDocument extends Document, ProductAttributes {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 30,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 3,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);