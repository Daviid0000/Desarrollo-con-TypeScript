import { Request, Response } from "express";
import companyService from "../services/company.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { secretKey } from "../config/environments.js";

export const viewCompanys = async (_req: Request, res: Response) => {
    try {
        const company = await companyService.findCompanys();

        if(!company) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Error: Empresas no encontradas"
            });
        };

        return res.json({company});
    } catch (error: any) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message})
    };
}

export const createCompany = async (req: Request, res: Response) => {
    const { company, email, password, rol } = req.body;
    console.log("datos:", company, email, password, rol)
    try {
        if(!company || !password) {
            return res.status(400).json({ message: "Empresa o contraseña faltante" })
        }

        if(!email) {
            return res.status(400).json({ message: "Email faltante" })
        }
        
        const companyExists = await companyService.findEmail(company);

        if(companyExists) {
            throw({
                statusCode: 400,
                message: "La empresa ya está registrada"
            })
        }

        const companyCreated = await companyService.createCompany({company, email, password, rol});
        
        if(!companyCreated) {
            throw({
                statusCode: 400,
                message: "Error: No se registró la empresa"
            });
        };
        
        const token = jwt.sign({ company }, secretKey, { expiresIn: '1h'});

        const hashPass = await bcrypt.genSalt(10);
        companyCreated.password = await bcrypt.hash(password, hashPass) 
        
        const newCompany = await companyCreated.save();

        return res.status(201).json({ message: "Empresa registrada", newCompany, token})
    } catch (error: any) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message})
    }
}

export const viewOneCompany = async (req: Request, res: Response) => {
    const { id } = req.params;
    const companyId = parseInt(id);

    try {
        const company = await companyService.findOneCompanyById(companyId)

        if(!company){
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Empresa no encontrada"
            })
        }

        return res.json(company)
    } catch (error: any) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message })
    }
}

export const updateOneCompany = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company, email, password, rol } = req.body;
    const companyId = parseInt(id);

    try {
        const companyUpdated = await companyService.updateCompany(companyId, { company, email, password, rol });
        const thisCompany = await companyService.findOneCompanyById(companyId);

        if(!companyUpdated){
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Empresa no actualizada"
            });
        };

        const hashPass = await bcrypt.genSalt(10);
        console.log(`Password Company: ${thisCompany.password}`)
        thisCompany.password = await bcrypt.hash(password, hashPass) 
        
        await thisCompany.save();

        return res.json({ message: "Empresa actualizada", thisCompany})
    } catch (error: any) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message})
    }
}

export const deleteOneCompany = async (req: Request, res: Response) => {
    const { id } = req.params;
    const companyId = parseInt(id);
    
    try {
        const companyDeleted = await companyService.deleteCompany(companyId);

        if(!companyDeleted) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Error: Empresa no eliminada"
            });
        };

        return res.json({ message: "Empresa eliminada", companyDeleted })
    } catch (error: any) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message })
    }
}

export const authLogin = async (req: Request, res: Response) => {
    try {
        const { company, password } = req.body;
        console.log(`Empresa: ${company}, Contraseña: ${password}`)

        if(!company || !password) {
            return res.status(400).json({ message: "Usuario o contraseña faltante" })
        }
        const thisCompany = await companyService.findCompany(company);
        const CompanyRol = thisCompany.rol;
        const CompanyEmail = thisCompany.email;
        console.log(`Rol de empresa: ${CompanyRol}`)
        console.log(`Contraseña de empresa: ${thisCompany.password}`)

        const authPass = bcrypt.compareSync(password, thisCompany.password);

        if(!authPass) {
            throw({
                statusCode: 400,
                message: "La contraseña no es valida"
            })
        }

        const token = jwt.sign({ company, CompanyRol, CompanyEmail }, secretKey, { expiresIn: '1h' });

        return res.json({message:"Uuh te has logueado, toma tu token:", token });
    } catch (error: any) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message })
    }
}