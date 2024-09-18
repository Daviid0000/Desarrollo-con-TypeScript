import { Router } from "express"
import { viewCompanys, viewOneCompany, updateOneCompany, createCompany, deleteOneCompany } from "../controllers/company.controller.js";
import authToken from "../middlewares/auth.token.js";

const userRoutes = Router();

userRoutes.get("/user", viewCompanys)
userRoutes.get("/user/:id", viewOneCompany)
userRoutes.put("/user/:id", authToken, updateOneCompany)
userRoutes.delete("/user/:id", authToken, deleteOneCompany)

userRoutes.post("/register", createCompany);


export default userRoutes;