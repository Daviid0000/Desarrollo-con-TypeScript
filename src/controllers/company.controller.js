import companyService from "../services/company.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { secretKey } from "../config/environments.js";

export const viewCompanys = async (req, res) => {
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
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message})
    };
}

export const createCompany = async (req, res) => {
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
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message})
    }
}

export const viewOneCompany = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await companyService.findOneCompanyById(id)

        if(!company){
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Empresa no encontrada"
            })
        }

        res.json(company)
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message })
    }
}

export const updateOneCompany = async (req, res) => {
    const { id } = req.params;
    const { company, email, password, rol } = req.body;
    try {
        const companyUpdated = await companyService.updateCompany(id, { company, email, password, rol });
        const thisCompany = await companyService.findOneCompanyById(id);

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

        res.json({ message: "Empresa actualizada", thisCompany})
    } catch (error) {
        res.stats(500).json({ message: "Error en el servidor", error: error.message})
    }
}

export const deleteOneCompany = async (req, res) => {
    const { id } = req.params;
    try {
        const companyDeleted = await companyService.deleteCompany({id});

        if(!companyDeleted) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Error: Empresa no eliminada"
            });
        };

        res.json({ message: "Empresa eliminada", companyDeleted })
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message })
    }
}

export const authLogin = async (req, res) => {
    try {
        const { company, password } = req.body;
        console.log(`Empresa: ${company}, Contraseña: ${password}`)

        if(!company || !password) {
            return res.status(400).json({ message: "Usuario o contraseña faltante" })
        }
        const thisCompany = await companyService.findCompany(company);
        const CompanyRol = thisCompany.rol;
        console.log(`Rol de empresa: ${CompanyRol}`)
        console.log(`Contraseña de empresa: ${thisCompany.password}`)

        const authPass = bcrypt.compareSync(password, thisCompany.password);

        if(!authPass) {
            throw({
                statusCode: 400,
                message: "La contraseña no es valida"
            })
        }

        const token = jwt.sign({ company, CompanyRol }, secretKey, { expiresIn: '1h' });

        res.json({message:"Uuh te has logueado, toma tu token:", token });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message })
    }
}