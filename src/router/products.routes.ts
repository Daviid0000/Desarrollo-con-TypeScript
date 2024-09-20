import { Router } from "express";
import { createProduct, deleteProduct, distributedProduct, getOneProduct, getProducts, getShipmentsByOrganization, updateProduct } from "../controllers/products.controller";
const routerProduct = Router();

routerProduct.get("/product/", getProducts)
routerProduct.post("/product/", createProduct)
routerProduct.get("/product/:id", getOneProduct)
routerProduct.put("/product/:id", updateProduct)
routerProduct.delete("/product/:id", deleteProduct)

// Distribución de producto
routerProduct.post("/product/:id", distributedProduct)
routerProduct.get("/product/:email", getShipmentsByOrganization)

export default routerProduct