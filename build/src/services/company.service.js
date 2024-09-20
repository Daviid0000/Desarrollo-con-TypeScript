var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { companyModel } from "../models/company.model";
class companyService {
    constructor() { }
    findCompanys() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield companyModel.findAll();
        });
    }
    createCompany(company) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield companyModel.create(company);
        });
    }
    findOneCompanyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield companyModel.findByPk(id);
        });
    }
    updateCompany(id, company) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield companyModel.update(company, { where: { id } });
        });
    }
    deleteCompany(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield companyModel.destroy({ where: { id } });
        });
    }
    findEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield companyModel.findOne({ where: { email } });
        });
    }
    findCompany(company) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield companyModel.findOne({ where: { company } });
        });
    }
}
export default new companyService();
//# sourceMappingURL=company.service.js.map