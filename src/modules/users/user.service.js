import { NotFoundError } from "../../common/errors/errors.js";
import { mapToDTO } from "../../common/utils/dto.utils.js";
import { userDao } from "./user.dao.js"
import UserDTO from "./user.dto.js";

class UserService {

    async create(data) {
        const user = await userDao.create(data);

        return mapToDTO(user, UserDTO);
    }

    async getAll() {
        const users = await userDao.getAll();

        return mapToDTO(users, UserDTO);
    }

    async getOne(query) {
        const user = await userDao.getOne(query);
        if(!user) throw new NotFoundError("User not found!");

        return mapToDTO(user, UserDTO);
    }

    async update(id, data) {
        return await userDao.update(id, data);
    }

    async deleteAll() {
        return await userDao.deleteAll();
    }

    async deleteOne(id) {
        return await userDao.deleteOne(id);
    }
}

export const userService = new UserService();
