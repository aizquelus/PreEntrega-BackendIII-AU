import { NotFoundError } from "../../common/errors/errors.js";
import { generateUsersMock } from "../../mock/users.mock.js";
import { userDao } from "./user.dao.js"
import UserDTO from "./user.dto.js";

class UserService {

    mapToUserDTO(users) {
        if (Array.isArray(users)) {
            return users.map(user => new UserDTO(user));
        }
        return new UserDTO(users);
    }

    async create(data) {
        return await userDao.create(data);
    }

    async createUsersMocks(amount) {
        const users = generateUsersMock(amount);
        await userDao.deleteAll();

        for(const user of users) {
            await userDao.create(user);
        }

        return this.mapToUserDTO(users);
    }

    async getAll() {
        const users = await userDao.getAll();

        return this.mapToUserDTO(users);
    }

    async getOne(query) {
        const user = await userDao.getOne(query);
        if(!user) throw new NotFoundError("user not found!");

        return this.mapToUserDTO(user);
    }

    async getUsersMocks(amount) {
        const users = generateUsersMock(amount);

        return this.mapToUserDTO(users);
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
