import express from "express";
import { Product } from "../model/productModel.js";

export const router = express.Router();

//Routes for products
//GET all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products); // Success: 200 OK
    } catch (err) {
        res.status(500).json({ message: err }); // Failure: 500 Internal Server Error
    }
});

//GET a specific product
router.get("/:productId", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            res.status(404).json({ message: "No product found" });
            return;
        }
        res.status(200).json(product); // Success: 200 OK
    } catch (err) {
        res.status(500).json({ message: err }); // Failure: 500 Internal Server Error
    }
});

//POST a product
router.post("/", async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
    });

    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct); // Success: 201 Created
    } catch (err) {
        res.status(500).json({ message: err }); // Failure: 500 Internal Server Error
    }
});

//UPDATE a product
router.patch("/:productId", async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne(
            { _id: req.params.productId },
            {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    description: req.body.description,
                },
            }
        );
        if (updatedProduct.n === 0) {
            res.status(404).json({ message: "No product found" });
            return;
        }
        res.status(200).json(updatedProduct); // Success: 200 OK
    } catch (err) {
        res.status(500).json({ message: err }); // Failure: 500 Internal Server Error
    }
});

//DELETE a product
router.delete("/:productId", async (req, res) => {
    try {
        const removedProduct = await Product.remove({
            _id: req.params.productId,
        });
        if (removedProduct.n === 0) {
            res.status(404).json({ message: "No product found" });
            return;
        }
        res.status(202).json(removedProduct); // Success: 200 Accepted
    } catch (err) {
        res.status(500).json({ message: err }); // Failure: 500 Internal Server Error
    }
});


