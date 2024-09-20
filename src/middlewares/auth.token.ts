import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "../config/environments.js";

const authToken = (req: Request, res: Response, next: any) => {
    const token = req.headers['authorization'];

    if(!token){
        return res.status(403).json({ mesage: "Token requerido" })
    };

    try {
        const decoded = jwt.verify(token, secretKey);
            (req as any).user = decoded;
            return next();
    } catch (err) {
        return res.status(401).json({ mesage: "Token invalido" })
    }

    
}

export default authToken