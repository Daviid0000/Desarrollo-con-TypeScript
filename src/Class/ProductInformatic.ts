import {IProduct} from '../Interfaces/Product.interface.js'


export class ProductInformatic implements IProduct {
    constructor(
        public company: string,
        public name: string,
        public description: string,
        public ubication: string,
        public stock: number,
        public distributed: number = 0
    ) {}
}
