import jwt from "jsonwebtoken";
import { secretKey } from "../config/environments.js";

const authToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token){
        return res.status(403).json({ mesage: "Token requerido" })
    };

    jwt.verify(token, secretKey, (err, decoded) => {
        if(err) {
            return res.status(401).json({ mesage: "Token invalido" })
        }
        req.user = decoded;

        next();
    })
}

export default authToken