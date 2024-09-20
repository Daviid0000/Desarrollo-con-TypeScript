var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import productService from "../services/product.service";
import companyService from "../services/company.service";
import { productStatus, rols } from "../types/types";
export const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productService.findAllProducts();
        if (!products) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron productos"
            });
        }
        return res.json(products);
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});
export const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { company, name, description, ubication, stock } = req.body;
    try {
        console.log(`Empresa: ${company}`);
        const getCompany = yield companyService.findCompany(company);
        if (!getCompany) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "Inicie sesion para publicar productos"
            });
        }
        ;
        console.log(`Rol de empresa: ${getCompany.rol}`);
        if (getCompany.rol !== rols.COMPANY_EMISOR) {
            throw ({
                statusCode: 400,
                message: "Empresa no autroizada para publicar productos"
            });
        }
        ;
        const createdProduct = yield productService.createProduct({ company, name, description, ubication, stock });
        if (!createdProduct) {
            throw ({
                statusCode: 400,
                message: "Error al crear el producto"
            });
        }
        ;
        return res.status(201).json({ message: "Producto publicado exitosamente", createdProduct });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});
export const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productId = parseInt(id);
    try {
        const product = yield productService.findByIDProduct(productId);
        if (!product) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "Producto no encontrado"
            });
        }
        ;
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
    ;
});
export const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productId = parseInt(id);
    const { company, name, description, ubication, stock } = req.body;
    try {
        const product = yield productService.findByIDProduct(productId);
        if (!product) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "Producto no encontrado"
            });
        }
        ;
        const getCompany = yield companyService.findCompany(company);
        console.log(`Compania: ${company}`);
        if (!getCompany) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "Compañia no autroizada para distribuir productos"
            });
        }
        ;
        if (getCompany.rol !== rols.COMPANY_EMISOR) {
            throw ({
                statusCode: 400,
                message: "La empresa no cumple con el rol de distribución"
            });
        }
        ;
        const productUpdated = yield productService.updateProduct(productId, { company, name, description, ubication, stock });
        if (!productUpdated) {
            throw ({
                statusCode: 400,
                message: "Producto no actualizado"
            });
        }
        ;
        res.json({ message: "Producto actualizado", product });
    }
    catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
    ;
});
export const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { company } = req.query;
    const productId = parseInt(id);
    if (typeof company !== "string") {
        return res.status(400).json({ message: "El nombre de la empresa debe ser un string" });
    }
    try {
        const getCompany = yield companyService.findCompany(company);
        console.log(`Compania: ${getCompany.rol}`);
        if (!getCompany) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "Compañia no autroizada para distribuir productos"
            });
        }
        ;
        if (getCompany.rol !== rols.COMPANY_EMISOR) {
            throw ({
                statusCode: 400,
                message: "La empresa no cumple con el rol de distribución"
            });
        }
        ;
        const productDeleted = yield productService.deleteProduct(productId);
        if (!productDeleted) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "Error: No se eliminó el producto"
            });
        }
        ;
        const product = yield productService.findByIDProduct(productId);
        return res.json({ message: "Producto eliminado", product });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
    ;
});
export const distributedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { distributed, company, organizationReceptor } = req.body;
    const productId = parseInt(id);
    try {
        const getCompany = yield companyService.findCompany(company);
        if (!getCompany) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "Inicie sesion para publicar productos"
            });
        }
        ;
        console.log(`Rol de empresa: ${getCompany.rol}`);
        if (getCompany.rol !== rols.COMPANY_EMISOR) {
            throw ({
                statusCode: 400,
                message: "Empresa no autroizada para publicar productos"
            });
        }
        ;
        const producto = yield productService.findByIDProduct(productId);
        if (!producto || (producto.stock <= 0)) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No hay stock de este producto"
            });
        }
        ;
        const organization = yield companyService.findCompany(organizationReceptor);
        const product = producto.name;
        const organizationRecep = organization.company;
        const companyDist = company;
        const quantity = distributed;
        const statusProduct = productStatus.ENVIADO;
        const dateSend = new Date();
        if (!organization) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "Organizacion no registrada"
            });
        }
        ;
        producto.update({
            stock: producto.stock - distributed,
            distributed: producto.distributed + distributed
        });
        yield productService.shipmentProduct({ product, organizationRecep, companyDist, quantity, statusProduct, dateSend });
        return res.json({ message: "Producto(s) distribuido(s)" });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    }
});
export const getShipmentsByOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const shipments = yield companyService.findEmail(email);
        if (!shipments) {
            return res.status(404).json({
                message: "No se encontraron productos enviados a esta organización"
            });
        }
        return res.json({
            message: "Productos enviados encontrados",
            shipments
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error al obtener los productos enviados",
            error: error.message
        });
    }
});
//# sourceMappingURL=products.controller.js.map