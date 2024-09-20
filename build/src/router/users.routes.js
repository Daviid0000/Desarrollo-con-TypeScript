import { Router } from "express";
import { viewCompanys, viewOneCompany, updateOneCompany, createCompany, deleteOneCompany } from "../controllers/company.controller";
import authToken from "../middlewares/auth.token";
const userRoutes = Router();
userRoutes.get("/user", viewCompanys);
userRoutes.get("/user/:id", viewOneCompany);
userRoutes.put("/user/:id", authToken, updateOneCompany);
userRoutes.delete("/user/:id", authToken, deleteOneCompany);
userRoutes.post("/register", createCompany);
export default userRoutes;
//# sourceMappingURL=users.routes.js.map