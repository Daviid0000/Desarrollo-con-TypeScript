import { Router } from "express";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "../controllers/products.controller.js";

const routerProduct = Router();

routerProduct.get("/", getProducts)
routerProduct.post("/", createProduct)
routerProduct.get("/:id", getOneProduct)
routerProduct.put("/:id", updateProduct)
routerProduct.delete("/:id", deleteProduct)

export default routerProduct