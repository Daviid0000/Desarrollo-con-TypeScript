import { modelProduct } from "../models/product.model.js";
import { ModelShipments } from "../models/shipment.model.js";
import { ProductInformatic } from "../Class/ProductInformatic.js";
import { ProductFactory } from "../Class/ProductFactory.js";
import { IProduct } from "../Interfaces/Product.interface.js";
import { objectVaried } from "../types/types.js";
import { Observer } from "../Interfaces/Observer.interface.js";

class ProductService extends ProductInformatic {
    private static instance: ProductService;
    private observers: Observer[] = []


    private constructor( company: string, name: string, description: string, ubication: string, stock: number, distributed: number = 0) {

        super(company, name, description, ubication, stock, distributed)
    }

    public addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Método para notificar a los observadores
    private notifyObservers(eventType: string, data: any): void {
        for (const observer of this.observers) {
            observer.update(eventType, data);
        }
    }

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
        
        const newProduct = await modelProduct.create({
            company: product.company,
            name: product.name,
            description: product.description,
            ubication: product.ubication,
            stock: product.stock,
            distributed: product.distributed,
        });
        this.notifyObservers("create", newProduct);  // Notificar observadores
        return newProduct;
    }


    async findByIDProduct(id: number): Promise<IProduct | any> {
        return await modelProduct.findByPk(id);
    }


    async updateProduct(id: number, productData: objectVaried) {
        const result = await modelProduct.update(productData, { where: { id } });
        this.notifyObservers("update", { id, ...productData });  // Notificar observadores
        return result;
    }


    async deleteProduct(id: number) {
        const result = await modelProduct.destroy({ where: { id } });
        this.notifyObservers("delete", { id });  // Notificar observadores
        return result;
    }


    async shipmentProduct(product: objectVaried) {
        const shipment = await ModelShipments.create(product);
        this.notifyObservers("shipment", shipment);  // Notificar observadores
        return shipment;
    }


    async findAllShipments() {
        return await ModelShipments.findAll();
    }
}


export default ProductService.getInstance();






