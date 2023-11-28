import {Request,Response} from 'express';
import { Product,ProductDocument } from '../model/productModel';
import asyncHandler from 'express-async-handler';


//define product crud functions

//Get all products

export const getProducts = asyncHandler(async(req:Request,res:Response)=>{
    const products = await Product.find({});
    res.json(products);
});

//Get single product

export const getProductById = asyncHandler(async(req:Request,res:Response)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404).json({message:"Product not found"});
    }
});

//Create product

export const createProduct = asyncHandler(async(req:Request,res:Response)=>{
    const {name,price,description,image,stock} = req.body;
    const product = new Product({
        name,
        price,
        description,
        image,
        stock
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

//Update product

export const updateProduct = asyncHandler(async(req:Request,res:Response)=>{
    const {name,price,description,image,stock} = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.stock = stock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }else{
        res.status(404).json({message:"Product not found"});
    }
});

//Delete product

export const deleteProduct = asyncHandler(async(req:Request,res:Response)=>{
    const product = await Product.findById(req.params.id);

    if(product){
        await product.deleteOne();
        res.json({message:"Product removed"});
    }else{
        res.status(404).json({message:"Product not found"});
    }
});