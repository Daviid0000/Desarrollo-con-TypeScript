import { Router } from "express"
import { viewUsers, createUser, viewOneUser, updateUser, deleteUser } from "../controllers/users.controller.js";

const userRoutes = Router();

userRoutes.get("/user", viewUsers)
// userRoutes.post("/user", createUser)
userRoutes.get("/user/:id", viewOneUser)
userRoutes.put("/user/:id", updateUser)
userRoutes.delete("/user/:id", deleteUser)

export default userRoutes;