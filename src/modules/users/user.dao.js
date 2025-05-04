import { NotFoundError } from "../../common/errors/errors.js";
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

        if(!user) throw new NotFoundError("User not found!");

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
