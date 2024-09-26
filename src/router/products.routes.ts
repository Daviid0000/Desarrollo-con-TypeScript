import { Router } from "express";
import { createProduct, deleteProduct, distributedProduct, getOneProduct, getProductsByCompany, getShipmentsByOrganization, productReceived, updateProduct } from "../controllers/products.controller.js";
const routerProduct = Router();

routerProduct.get("/product/:company", getProductsByCompany)
routerProduct.post("/product/", createProduct)
routerProduct.get("/product/:id", getOneProduct)
routerProduct.put("/product/:id", updateProduct)
routerProduct.delete("/product/:id", deleteProduct)

// Distribución de producto
routerProduct.post("/product/:id", distributedProduct)
routerProduct.get("/products/:company", getShipmentsByOrganization)
routerProduct.put("/productReceived/:shipmentId", productReceived)

export default routerProduct