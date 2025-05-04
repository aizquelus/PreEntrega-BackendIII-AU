import { NotFoundError } from "../../common/errors/errors.js";
import { petDao } from "./pet.dao.js"

class PetService {

    async create(data) {
        return await petDao.create(data);
    }

    async getAll() {
        return await petDao.getAll();
    }

    async getOne(query) {
        const pet = await petDao.getOne(query);
        if(!pet) throw new NotFoundError("Pet not found!");

        return pet;
    }

    async update(id, data) {
        const pet = await petDao.getOne({ _id: id });
        if(!pet) throw new NotFoundError("Pet not found!");

        return await petDao.update(id, data);
    }

    async deleteAll() {
        return await petDao.deleteAll();
    }

    async deleteOne(id) {
        const pet = await petDao.getOne({ _id: id });
        if(!pet) throw new NotFoundError("Pet not found!");

        return await petDao.deleteOne(id);
    }
}

export const petService = new PetService();
