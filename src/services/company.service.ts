import { companyModel } from "../models/company.model.js"
import { Company, objectVaried, passwordCompany, longitudDeEnvios } from "../types/types.js"
import { ModelShipments } from "../models/shipment.model.js"

class companyService {
    constructor() { }

    async findCompanys() {
        return await companyModel.findAll()
    }

    async createCompany(company: objectVaried): Promise<passwordCompany | any> {
        return await companyModel.create(company)
    }

    async findOneCompanyById(id: number): Promise<passwordCompany | any> {
        return await companyModel.findByPk(id)
    }

    async updateCompany(id: number, company: objectVaried) {
        return await companyModel.update(company, { where: { id }})
    }

    async deleteCompany(id: number) {
        return await companyModel.destroy({ where: {id}})
    }

    async findEmail(email: string){
        return await companyModel.findOne({where: { email }})
    }

    async findCompany(company: string): Promise<Company | any> {
        return await companyModel.findOne({where: { company }})
    }

    async findShipmentsByCompany(company: string): Promise<longitudDeEnvios | any> {
        try {
            const shipments = await ModelShipments.findAll({ where: { organizationRecep: company } });
            return shipments;
        } catch (error) {
            console.error("Error al buscar envíos:", error);
            throw error;
        }
    }
}

export default new companyService();