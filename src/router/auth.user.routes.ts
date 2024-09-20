import { Router } from "express";
import { authLogin } from "../controllers/company.controller.js";

const authUser = Router();

authUser.post("/login", authLogin)

export default authUser;