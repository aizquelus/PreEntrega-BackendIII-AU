import { expect } from "chai";
import supertest from "supertest";

describe("Integration Tests for Pets Module", () => {
    const request = supertest("http://localhost:8080/api");

    let petTest;
    let petNameTest = "Quinoa";
    let petSpecieTest = "Dog";
    let petBirthDateTest = "2020-05-17";
    let petImageTest = "https://example.com/quinoa.jpg";
    let petNameTestUpdate = "Botón";
    let petSpecieTestUpdate = "Cat";

    it("[POST] /api/pets - Should create a new pet", async () => {
        const newPet = {
            name: petNameTest,
            specie: petSpecieTest,
            birthDate: petBirthDateTest,
            image: petImageTest
        };

        const { status, body, error } = await request.post("/pets").send(newPet);

        if (error) {
            console.log("Error: ", error);
        }
        const { pet } = body;
        petTest = pet;

        expect(status).to.be.equal(201);
        expect(pet).to.have.property("_id");
        expect(pet).to.have.property("name");
        expect(pet).to.have.property("specie");
        expect(pet).to.have.property("image");
        expect(pet.name).to.be.equal(petNameTest);
        expect(pet.specie).to.be.equal(petSpecieTest);
        expect(pet.birthDate).to.be.equal("2020-05-17T00:00:00.000Z");
        expect(pet.image).to.be.equal(petImageTest);
    });

    it("[PUT] /api/pets/:id - Should update a pet", async () => {
        const updatePet = {
            name: petNameTestUpdate,
            specie: petSpecieTestUpdate
        };

        const { status, body, error } = await request.put(`/pets/${petTest._id}`).send(updatePet);

        const { pet } = body;
        petTest = pet;

        expect(status).to.be.equal(200);
        expect(pet).to.have.property("_id");
        expect(pet).to.have.property("name");
        expect(pet).to.have.property("specie");
        expect(pet).to.have.property("image");
        expect(pet.name).to.be.equal(petNameTestUpdate);
        expect(pet.specie).to.be.equal(petSpecieTestUpdate);
        expect(pet.birthDate).to.be.equal("2020-05-17T00:00:00.000Z");
        expect(pet.image).to.be.equal(petImageTest);
    });

    it("[GET] /api/pets/:id - Should return a pet", async () => {

        const { status, body, error } = await request.get(`/pets/${petTest._id}`);

        const { pet } = body;

        expect(status).to.be.equal(200);
        expect(pet).to.have.property("_id");
        expect(pet).to.have.property("name");
        expect(pet).to.have.property("specie");
        expect(pet).to.have.property("image");
        expect(pet.name).to.be.equal(petNameTestUpdate);
        expect(pet.specie).to.be.equal(petSpecieTestUpdate);
        expect(pet.birthDate).to.be.equal("2020-05-17T00:00:00.000Z");
        expect(pet.image).to.be.equal(petImageTest);
    });

    it("[DELETE] /api/pets/:id - Should delete a pet", async () => {
        const { status, body, error } = await request.delete(`/pets/${petTest._id}`);

        expect(status).to.be.equal(200);
        expect(body.pet).to.be.undefined;

        const { status: getStatus } = await request.get(`/pets/${petTest._id}`);
        expect(getStatus).to.be.equal(404);
    });

});
