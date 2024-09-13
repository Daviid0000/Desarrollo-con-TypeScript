import { Router } from "express";
import jwt from "jsonwebtoken"
import { authLogin, createUser } from "../controllers/users.controller.js";

const authUser = Router();

authUser.post("/registro", createUser);

authUser.post("/login", authLogin)

export default authUser;