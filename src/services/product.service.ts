import { modelProduct } from "../models/product.model.js";
import { ModelShipments } from "../models/shipment.model.js";
import { objectVaried, Product } from "../types/types.js";

class productService {
    constructor() { }

    async findAllProductsByCompany(company: string): Promise<Product | any>{
        console.log("compania buscada: ", company)
        return await modelProduct.findAll({ where: {company: company}})
    }

    async createProduct(product: objectVaried){
        return await modelProduct.create(product)
    }

    async findByIDProduct(id: number): Promise<Product | any> {
        return await modelProduct.findByPk(id)
    }

    async updateProduct(id: number, product: objectVaried) {
        return await modelProduct.update(product, { where: { id } })
    }

    async deleteProduct(id: number) {
        return await modelProduct.destroy({ where : {id}})
    }

    async shipmentProduct(product: objectVaried) {
        return await ModelShipments.create(product)
    }

    async findAllShipments(){
        return await ModelShipments.findAll()
    }

}

export default new productService();