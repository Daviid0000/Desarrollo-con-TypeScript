import { IProduct } from '../Interfaces/Product.interface.js';
import { ProductInformatic } from './ProductInformatic.js';

export class ProductFactory {
    public static createProduct(type: string, data: any): IProduct {
        switch (type) {
            case 'basic':
                return new ProductInformatic(data.company, data.name, data.description, data.ubication, data.stock);
            default:
                throw new Error('Tipo de producto no reconocido');
        }
    }
}

