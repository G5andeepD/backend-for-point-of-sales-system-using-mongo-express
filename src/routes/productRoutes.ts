import express from 'express';

import {getProducts,getProductById,createProduct,updateProduct,deleteProduct} from '../controller/productController';

export const router = express.Router();

router.get("/",getProducts);

router.get("/:id",getProductById);

router.post("/",createProduct);

router.put("/:id",updateProduct);

router.delete("/:id",deleteProduct);
