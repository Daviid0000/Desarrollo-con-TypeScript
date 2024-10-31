import { companyModel } from "../models/company.model.js";
import { Company, objectVaried, passwordCompany, Shipment } from "../types/types.js";
import { ModelShipments } from "../models/shipment.model.js";

class CompanyService {
    private static instance: CompanyService;

    private constructor() { }

    public static getInstance(): CompanyService {
        if (!CompanyService.instance) {
            CompanyService.instance = new CompanyService();
        }
        return CompanyService.instance;
    }

    async findCompanys() {
        return await companyModel.findAll();
    }

    async createCompany(company: objectVaried): Promise<passwordCompany | any> {
        return await companyModel.create(company);
    }

    async findOneCompanyById(id: number): Promise<passwordCompany | any> {
        return await companyModel.findByPk(id);
    }

    async updateCompany(id: number, company: objectVaried) {
        return await companyModel.update(company, { where: { id } });
    }

    async deleteCompany(id: number) {
        return await companyModel.destroy({ where: { id } });
    }

    async findEmail(email: string) {
        return await companyModel.findOne({ where: { email } });
    }

    async findCompany(company: string): Promise<Company | any> {
        return await companyModel.findOne({ where: { company } });
    }

    async findShipmentsByCompany(company: string): Promise<Shipment | any> {
        try {
            const shipments = await ModelShipments.findAll({ where: { organizationRecep: company } });
            return shipments;
        } catch (error) {
            console.error("Error al buscar envíos:", error);
            throw error;
        }
    }

    async markAsReceived(shipmentId: number): Promise<Shipment | any> {
        return await ModelShipments.findByPk(shipmentId);
    }
}

export default CompanyService.getInstance();
