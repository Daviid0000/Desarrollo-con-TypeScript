import { userModel } from "../models/user.model.js"

class userService {
    constructor() { }

    async findUsers() {
        return await userModel.findAll()
    }

    async createUsers(user) {
        return await userModel.create(user)
    }

    async findOneUser(id) {
        return await userModel.findByPk(id)
    }

    async updateUser(id, user) {
        return await userModel.update(user, { where: { id }})
    }

    async deleteUser(id) {
        return await userModel.destroy({ where: id})
    }

    async findEmail(username) {
        return await userModel.findOne({where: { username }})
    }

    async findUser(username) {
        return await userModel.findOne({where: { username }})
    }

}

export default new userService();