import { Router } from "express"
import { viewUsers, createUser, viewOneUser, updateUser, deleteUser } from "../controllers/users.controller.js";
import authToken from "../middlewares/auth.token.js";

const userRoutes = Router();

userRoutes.get("/user", authToken, viewUsers)
userRoutes.get("/user/:id", viewOneUser)
userRoutes.put("/user/:id", updateUser)
userRoutes.delete("/user/:id", deleteUser)

userRoutes.post("/register", createUser);


export default userRoutes;