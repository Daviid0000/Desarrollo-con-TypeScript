import productService from "../services/product.service.js"
import companyService from "../services/company.service.js";
import { productStatus, rols } from "../types/types.js";
import { Request, Response } from "express";

export const getProducts = async (_req: Request, res: Response) => {
    try {
        const products = await productService.findAllProducts();

        if(!products) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron productos"
            })
        }

        return res.json(products)
    } catch (error:any) {
        return res.status(500).json({message: "Error en el servidor", error: error.message})
    }
}

export const createProduct = async (req: Request, res: Response) => {
    const { company, name, description, ubication, stock } = req.body;
    try {
        console.log(`Empresa: ${company}`);
        const getCompany = await companyService.findCompany(company);

        if(!getCompany) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Inicie sesion para publicar productos"
            });
        };

        console.log(`Rol de empresa: ${getCompany.rol}`)
        if(getCompany.rol !== rols.COMPANY_EMISOR) {
            throw({
                statusCode: 400,
                message: "Empresa no autroizada para publicar productos"
            });
        };

        const createdProduct = await productService.createProduct({ company, name, description, ubication, stock });
        
        if(!createdProduct){
            throw({
                statusCode: 400,
                message: "Error al crear el producto"
            });
        };

        return res.status(201).json({message: "Producto publicado exitosamente", createdProduct});
    } catch (error: any) {
        return res.status(500).json({message: "Error en el servidor", error: error.message});
    }
}

export const getOneProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const productId = parseInt(id)

    try {
        const product = await productService.findByIDProduct(productId);

        if(!product){
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Producto no encontrado"
            });
        };

        res.json(product);
    } catch (error: any) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    };
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const productId = parseInt(id)
    const { company, name, description, ubication, stock } = req.body;
    try {
        const product = await productService.findByIDProduct(productId);

        if(!product){
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Producto no encontrado"
            });
        };

        const getCompany = await companyService.findCompany(company);
        console.log(`Compania: ${company}`);

        if(!getCompany) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Compañia no autroizada para distribuir productos"
            });
        };

        if(getCompany.rol !== rols.COMPANY_EMISOR) {
            throw({
                statusCode: 400,
                message: "La empresa no cumple con el rol de distribución"
            });
        };

        const productUpdated = await productService.updateProduct(productId, { company, name, description, ubication, stock });

        if(!productUpdated){
            throw({
                statusCode: 400,
                message: "Producto no actualizado"
            });
        };

        res.json({ message: "Producto actualizado", product})
    } catch (error: any) {
        res.status(500).json({ message: "Error en el servidor", error: error.message});
    };
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.query;
    const productId = parseInt(id);

    if(typeof company !== "string") {
        return res.status(400).json({ message: "El nombre de la empresa debe ser un string"})
    }

    try {
        const getCompany = await companyService.findCompany(company);
        console.log(`Compania: ${getCompany.rol}`);

        if(!getCompany) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Compañia no autroizada para distribuir productos"
            });
        };

        if(getCompany.rol !== rols.COMPANY_EMISOR) {
            throw({
                statusCode: 400,
                message: "La empresa no cumple con el rol de distribución"
            });
        };

        const productDeleted = await productService.deleteProduct(productId);

        if(!productDeleted) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Error: No se eliminó el producto"
            });
        };

        const product = await productService.findByIDProduct(productId);

        return res.json({ message: "Producto eliminado", product });
    } catch (error: any) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    };
};

export const distributedProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { distributed, company, organizationReceptor } = req.body;
    const productId = parseInt(id);

    try {
        const getCompany = await companyService.findCompany(company);

        if(!getCompany) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Inicie sesion para publicar productos"
            });
        };

        console.log(`Rol de empresa: ${getCompany.rol}`)

        if(getCompany.rol !== rols.COMPANY_EMISOR) {
            throw({
                statusCode: 400,
                message: "Empresa no autroizada para publicar productos"
            });
        };

        const producto = await productService.findByIDProduct(productId);
        if(!producto || (producto.stock <= 0)){
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "No hay stock de este producto"
            });
        };

        const organization = await companyService.findCompany(organizationReceptor);

        const product = producto.name;
        const organizationRecep = organization.company;
        const companyDist = company;
        const quantity = distributed;
        const statusProduct = productStatus.ENVIADO
        const dateSend = new Date();

        if(!organization) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Organizacion no registrada"
            });
        };

        producto.update({
            stock: producto.stock - distributed, 
            distributed: producto.distributed + distributed
        });

        await productService.shipmentProduct({ product, organizationRecep, companyDist, quantity, statusProduct, dateSend })

        return res.json({ message: "Producto(s) distribuido(s)"});
        
    } catch (error: any) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    }
};

export const getShipmentsByOrganization = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
        const shipments = await companyService.findEmail(email);

        if (!shipments) {
            return res.status(404).json({
                message: "No se encontraron productos enviados a esta organización"
            });
        }

        return res.json({
            message: "Productos enviados encontrados",
            shipments
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error al obtener los productos enviados",
            error: error.message
        });
    }
};