import { companyModel } from "../models/company.model.js"

class companyService {
    constructor() { }

    async findCompanys() {
        return await companyModel.findAll()
    }

    async createCompany(company) {
        return await companyModel.create(company)
    }

    async findOneCompanyById(id) {
        return await companyModel.findByPk(id)
    }

    async updateCompany(id, company) {
        return await companyModel.update(company, { where: { id }})
    }

    async deleteCompany(id) {
        return await companyModel.destroy({ where: id})
    }

    async findEmail(email) {
        return await companyModel.findOne({where: { email }})
    }

    async findCompany(company) {
        return await companyModel.findOne({where: { company }})
    }

}

export default new companyService();