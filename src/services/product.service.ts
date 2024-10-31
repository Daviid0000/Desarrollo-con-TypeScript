import { modelProduct } from "../models/product.model.js";
import { ModelShipments } from "../models/shipment.model.js";
// import { IProductService } from "../interfaces/IProductService.js"; // Asegúrate de que el path sea correcto
import { ProductInformatic } from "../Class/ProductInformatic.js";
// import { ProductFactory } from "../factories/product.factory.js"; // Ajusta el path según sea necesario
import { ProductFactory } from "../Class/ProductFactory.js";
// import { IProduct } from "../interfaces/product.interface.js"; // Ajusta el path según sea necesario
import { IProduct } from "../Interfaces/Product.interface.js";
import { objectVaried } from "../types/types.js"; // Ajusta el path según sea necesario

class ProductService extends ProductInformatic {
    private static instance: ProductService;


    private constructor( company: string, name: string, description: string, ubication: string, stock: number, distributed: number = 0) {

        super(company, name, description, ubication, stock, distributed)
    }


    // Método para obtener la instancia única (Singleton)
    // public static getInstance(): ProductService {
    //     if (!ProductService.instance) {
    //         ProductService.instance = new ProductService();
    //     }
    //     return ProductService.instance;
    // }

    public static getInstance(): ProductService {
        if(!ProductService.instance) {
            ProductService.instance = new ProductService('', '', '', '', 0)
        }
        return ProductService.instance;
    }


    async findAllProductsById(company: string) {
        return await modelProduct.findAll({
            where: {
                company: company,
            },
        });
    }


    async createProduct(productData: objectVaried) {
        
        const product = ProductFactory.createProduct('basic', productData);
        
        return await modelProduct.create({
            company: product.company,
            name: product.name,
            description: product.description,
            ubication: product.ubication,
            stock: product.stock,
            distributed: product.distributed,
        });
    }


    async findByIDProduct(id: number): Promise<IProduct | any> {
        return await modelProduct.findByPk(id);
    }


    async updateProduct(id: number, productData: objectVaried) {
        return await modelProduct.update(productData, { where: { id } });
    }


    async deleteProduct(id: number) {
        return await modelProduct.destroy({ where: { id } });
    }


    async shipmentProduct(product: objectVaried) {
        return await ModelShipments.create(product);
    }


    async findAllShipments() {
        return await ModelShipments.findAll();
    }
}


export default ProductService.getInstance();






