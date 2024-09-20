export const rols = {
    ADMIN: "ADMIN",
    COMPANY_EMISOR: "COMPANY_EMISOR",
    ORGANIZATION_RECEPTOR: "ORGANIZATION_RECEPTOR"
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
}

// Empresa con 2 tipos de datos string
export interface Company {
    company: string;
    email: string;
    password: string;
    rol: string;
}

export type passwordCompany = Pick<Company, 'password'>
