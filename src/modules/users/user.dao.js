import { userModel } from "./user.model.js";

class UserDao {

    async create(data) {
        return await userModel.create(data); 
    }

    async getAll() {
        return await userModel.find();
    }

    async getOne(query) {
        const user = await userModel.findOne(query).populate("pets");

        return user;
    }

    async update(id, data) {
        return await userModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteOne(id) {
        return await userModel.findByIdAndDelete(id);
    }

    async deleteAll() {
        return await userModel.deleteMany();
    }

};

export const userDao = new UserDao();
