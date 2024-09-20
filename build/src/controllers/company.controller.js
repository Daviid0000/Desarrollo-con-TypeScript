var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import companyService from "../services/company.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { secretKey } from "../config/environments";
export const viewCompanys = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield companyService.findCompanys();
        if (!company) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "Error: Empresas no encontradas"
            });
        }
        ;
        return res.json({ company });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
    ;
});
export const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { company, email, password, rol } = req.body;
    console.log("datos:", company, email, password, rol);
    try {
        if (!company || !password) {
            return res.status(400).json({ message: "Empresa o contraseña faltante" });
        }
        if (!email) {
            return res.status(400).json({ message: "Email faltante" });
        }
        const companyExists = yield companyService.findEmail(company);
        if (companyExists) {
            throw ({
                statusCode: 400,
                message: "La empresa ya está registrada"
            });
        }
        const companyCreated = yield companyService.createCompany({ company, email, password, rol });
        if (!companyCreated) {
            throw ({
                statusCode: 400,
                message: "Error: No se registró la empresa"
            });
        }
        ;
        const token = jwt.sign({ company }, secretKey, { expiresIn: '1h' });
        const hashPass = yield bcrypt.genSalt(10);
        companyCreated.password = yield bcrypt.hash(password, hashPass);
        const newCompany = yield companyCreated.save();
        return res.status(201).json({ message: "Empresa registrada", newCompany, token });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});
export const viewOneCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const companyId = parseInt(id);
    try {
        const company = yield companyService.findOneCompanyById(companyId);
        if (!company) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "Empresa no encontrada"
            });
        }
        return res.json(company);
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});
export const updateOneCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { company, email, password, rol } = req.body;
    const companyId = parseInt(id);
    try {
        const companyUpdated = yield companyService.updateCompany(companyId, { company, email, password, rol });
        const thisCompany = yield companyService.findOneCompanyById(companyId);
        if (!companyUpdated) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "Empresa no actualizada"
            });
        }
        ;
        const hashPass = yield bcrypt.genSalt(10);
        console.log(`Password Company: ${thisCompany.password}`);
        thisCompany.password = yield bcrypt.hash(password, hashPass);
        yield thisCompany.save();
        return res.json({ message: "Empresa actualizada", thisCompany });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});
export const deleteOneCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const companyId = parseInt(id);
    try {
        const companyDeleted = yield companyService.deleteCompany(companyId);
        if (!companyDeleted) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "Error: Empresa no eliminada"
            });
        }
        ;
        return res.json({ message: "Empresa eliminada", companyDeleted });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});
export const authLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { company, password } = req.body;
        console.log(`Empresa: ${company}, Contraseña: ${password}`);
        if (!company || !password) {
            return res.status(400).json({ message: "Usuario o contraseña faltante" });
        }
        const thisCompany = yield companyService.findCompany(company);
        const CompanyRol = thisCompany.rol;
        const CompanyEmail = thisCompany.email;
        console.log(`Rol de empresa: ${CompanyRol}`);
        console.log(`Contraseña de empresa: ${thisCompany.password}`);
        const authPass = bcrypt.compareSync(password, thisCompany.password);
        if (!authPass) {
            throw ({
                statusCode: 400,
                message: "La contraseña no es valida"
            });
        }
        const token = jwt.sign({ company, CompanyRol, CompanyEmail }, secretKey, { expiresIn: '1h' });
        return res.json({ message: "Uuh te has logueado, toma tu token:", token });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});
//# sourceMappingURL=company.controller.js.map