import { Router } from "express";
import { createProduct, deleteProduct, distributedProduct, getOneProduct, getProductsByCompany, getShipmentsByOrganization, productReceived, updateProduct } from "../controllers/products.controller.js";
const routerProduct = Router();

<<<<<<< HEAD
routerProduct.get("/product/:company", getProducts)
routerProduct.post("/producto/", createProduct)
=======
routerProduct.get("/product/:company", getProductsByCompany)
routerProduct.post("/product/", createProduct)
>>>>>>> 4288334cf16a0fb92edad8a2dfe32c7d91814b7c
routerProduct.get("/product/:id", getOneProduct)
routerProduct.put("/product/:id", updateProduct)
routerProduct.delete("/product/:id", deleteProduct)

// Distribución de producto
routerProduct.post("/product/:id", distributedProduct)
routerProduct.get("/products/:company", getShipmentsByOrganization)
routerProduct.put("/productReceived/:shipmentId", productReceived)

export default routerProduct