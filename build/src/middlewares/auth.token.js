import jwt from "jsonwebtoken";
import { secretKey } from "../config/environments";
const authToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ mesage: "Token requerido" });
    }
    ;
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        return next();
    }
    catch (err) {
        return res.status(401).json({ mesage: "Token invalido" });
    }
};
export default authToken;
//# sourceMappingURL=auth.token.js.map