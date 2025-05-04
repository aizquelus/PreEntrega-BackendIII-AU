import { generateUsersMock } from "../../mock/users.mock.js";
import { userDao } from "../users/user.dao.js"
import UserDTO from "../users/user.dto.js";
import { generatePetsMock } from "../../mock/pets.mock.js";
import { petDao } from "../pets/pet.dao.js"
import { mapToDTO } from "../../common/utils/dto.utils.js";

class MocksService {

    async createUsersMocks(amount) {
        const users = generateUsersMock(amount);
        await userDao.deleteAll();

        for (const user of users) {
            await userDao.create(user);
        }

        return mapToDTO(users, UserDTO);
    }

    async getUsersMocks(amount) {
        const users = generateUsersMock(amount);

        return mapToDTO(users, UserDTO);
    }

    async createPetsMocks(amount) {
        const pets = generatePetsMock(amount);
        await petDao.deleteAll();

        for (const pet of pets) {
            await petDao.create(pet);
        }

        return pets;
    }

    async getPetsMocks(amount) {
        return generatePetsMock(amount);
    }
}

export const mocksService = new MocksService();
