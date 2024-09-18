import { modelProduct } from "../models/product.model.js";
import { ModelShipments } from "../models/shipment.model.js";

class productService {
    constructor() { }

    async findAllProducts(){
        return await modelProduct.findAll()
    }

    async createProduct(product){
        return await modelProduct.create(product)
    }

    async findByIDProduct(id) {
        return await modelProduct.findByPk(id)
    }

    async updateProduct(id, product) {
        return await modelProduct.update(product, { where: { id } })
    }

    async deleteProduct(id) {
        return await modelProduct.destroy({ where : {id}})
    }

    async shipmentProduct(product) {
        return await ModelShipments.create(product)
    }
}

export default new productService();