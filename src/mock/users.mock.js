import { fakerES as faker } from "@faker-js/faker";
import { createHash } from "../common/utils/hashPassword.js"

export const generateUsersMock = amount => {
    const users = [];

    for(let i = 0; i < amount; i++) {
        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: createHash("coder123"),
            role: Math.random() < 0.5 ? "admin" : "user"
        }

        users.push(user);
    }

    return users;
};
