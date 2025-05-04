import { NotFoundError } from "../../common/errors/errors.js";
import { petDao } from "../pets/pet.dao.js";
import { userDao } from "../users/user.dao.js";
import { adoptionDao } from "./adoption.dao.js";

class AdoptionService {
    async getAll() {
        return await adoptionDao.getAll();
    }

    async getOne(query) {
        const adoption = await adoptionDao.getOne(query);
        if (!adoption) throw new NotFoundError("Adoption not found!");

        return adoption;
    }

    async create(ownerId, petId) {
        const pet = await petDao.getOne({ _id: petId });
        if (!pet) throw new NotFoundError("Pet not found!");
        if (pet.adopted) throw new NotFoundError("This pet is already adopted!");

        const user = await userDao.getOne({ _id: ownerId });
        if (!user) throw new NotFoundError("User not found!");

        const adoption = await adoptionDao.create({ owner: ownerId, pet: petId });

        await petDao.update(pet._id, { adopted: true, owner: user._id });

        const updatePets = [...user.pets, { _id: pet._id }];
        await userDao.update(user._id, { pets: updatePets });

        return adoption;
    }

    async deleteOne(id) {
        const adoption = await this.getOne({ _id: id });
        if (!adoption) throw new NotFoundError("Adoption not found!");

        const pet = await petDao.getOne({ _id: adoption.pet });
        if (!pet) throw new NotFoundError("Pet not found!");
        if (!pet.adopted) throw new NotFoundError("This pet is not adopted!");

        const user = await userDao.getOne({ _id: adoption.owner });
        if (!user) throw new NotFoundError("User not found!");

        const updatePets = user.pets.filter((pet) => pet._id.toString() !== adoption.pet._id.toString());

        await userDao.update(user._id, { pets: updatePets });
        await petDao.update(pet._id, { adopted: false, owner: null });

        return await adoptionDao.deleteOne(id);
    }

}

export const adoptionService = new AdoptionService();
