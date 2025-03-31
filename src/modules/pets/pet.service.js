import { NotFoundError } from "../../common/errors/errors.js";
import { generatePetsMock } from "../../mock/pets.mock.js";
import { petDao } from "./pet.dao.js"

class PetService {

    async create(data) {
        return await petDao.create(data);
    }

    async createPetsMocks(amount) {
        const pets = generatePetsMock(amount);
        await petDao.deleteAll();

        for(const pet of pets) {
            await petDao.create(pet);
        }

        return pets;
    }

    async getAll() {
        return await petDao.getAll();
    }

    async getOne(query) {
        const pet = await petDao.getOne(query);
        if(!pet) throw new NotFoundError("Pet not found!");

        return pet;
    }

    async getPetsMocks(amount) {
        return generatePetsMock(amount);
    }

    async update(id, data) {
        return await petDao.update(id, data);
    }

    async deleteAll() {
        return await petDao.deleteAll();
    }

    async deleteOne(id) {
        return await petDao.deleteOne(id);
    }
}

export const petService = new PetService();
