export const rols = {
    ADMIN: "ADMIN",
    COMPANY_EMISOR: "DISTRIBUIDORA",
    ORGANIZATION_RECEPTOR: "RECEPTOR"
}

export const productStatus = {
    ENVIADO: "ENVIADO",
    NO_ENVIADO: "NO_ENVIADO"
}

// Objeto con variedad de valores
export type objectVaried = {[key: string]: string | number | Date}

// export type Model = string|number[]

// Producto con el id tipado
export type Product = {
    id: number;
    company: string 
    name: string
    description: string
    ubication: string
    adquisition: Date
    stock: number
    distributed: number
}

// export type productId = Pick<Company, 'id'>


// Empresa con 2 tipos de datos string
export interface Company {
    company: string;
    email: string;
    password: string;
    rol: string;
}

// Obteniendo unicamente la password de la interfaz Company
export type passwordCompany = Pick<Company, 'password'>

export interface ShipmentProducts {
    id: number;
    product: string;
    quantity: number;
    companyDist: string;
    dateSend: number;
    statusProduct: string;
}

export interface Shipment {
    id: number;
    product: string;
    organizationRecep: string;
    companyDist: string;
    quantity: number;
    statusProduct: string;
    dateSend: Date;
    dateReceived?: Date;
    length: any;
}