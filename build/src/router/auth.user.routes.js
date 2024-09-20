import { Router } from "express";
import { authLogin } from "../controllers/company.controller";
const authUser = Router();
authUser.post("/login", authLogin);
export default authUser;
//# sourceMappingURL=auth.user.routes.js.map