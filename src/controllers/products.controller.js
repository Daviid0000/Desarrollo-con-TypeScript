import productService from "../services/product.service.js"
import companyService from "../services/company.service.js";
import { productStatus, rols } from "../types/types.js";

export const getProducts = async (req, res) => {
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
    } catch (error) {
        res.status(500).json({message: "Error en el servidor", error: error.message})
    }
}

export const createProduct = async (req, res) => {
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

        res.status(201).json({message: "Producto publicado exitosamente", createdProduct});
    } catch (error) {
        res.status(500).json({message: "Error en el servidor", error: error.message});
    }
}

export const getOneProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productService.findByIDProduct(id);

        if(!product){
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Producto no encontrado"
            });
        };

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    };
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { company, name, description, ubication, adquisition, stock } = req.body;
    try {
        const product = await productService.findByIDProduct(id);

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

        const productUpdated = await productService.updateProduct(id, { company, name, description, ubication, adquisition, stock });

        if(!productUpdated){
            throw({
                statusCode: 400,
                message: "Producto no actualizado"
            });
        };

        res.json({ message: "Producto actualizado", product})
    } catch (error) {
        res.stats(500).json({ message: "Error en el servidor", error: error.message});
    };
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { company } = req.body;
    try {

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

        const productDeleted = await productService.deleteProduct(id);

        if(!productDeleted) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Error: No se eliminó el producto"
            });
        };

        const product = await productService.findByIDProduct(id);

        res.json({ message: "Producto eliminado", product });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    };
};

export const distributedProduct = async (req, res) => {
    const { id } = req.params;
    const { distributed, company, email } = req.body;

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

        const producto = await productService.findByIDProduct(id);
        if(!producto || (producto.stock <= 0)){
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "No hay stock de este producto"
            });
        };

        const organization = await companyService.findEmail(email);

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
        
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    };
}