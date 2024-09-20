var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { modelProduct } from "../models/product.model";
import { ModelShipments } from "../models/shipment.model";
class productService {
    constructor() { }
    findAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield modelProduct.findAll();
        });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield modelProduct.create(product);
        });
    }
    findByIDProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield modelProduct.findByPk(id);
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield modelProduct.update(product, { where: { id } });
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield modelProduct.destroy({ where: { id } });
        });
    }
    shipmentProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelShipments.create(product);
        });
    }
    findAllShipments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelShipments.findAll();
        });
    }
}
export default new productService();
//# sourceMappingURL=product.service.js.map