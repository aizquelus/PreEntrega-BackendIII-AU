import { fakerES as faker } from "@faker-js/faker";

export const generatePetsMock = amount => {
    const pets = [];
    const animals = [ "Perro", "Gato", "Conejo", "Carpincho", "Hámster", "Pájaro" ];

    for(let i = 0; i < amount; i++) {
        const pet = {
            name: faker.person.firstName(),
            specie: faker.helpers.arrayElement(animals),
            birthDate: faker.date.past({ years: 5 }),
            image: faker.image.urlLoremFlickr({ category: "animals" })
        }

        pets.push(pet);
    }

    return pets;
};
