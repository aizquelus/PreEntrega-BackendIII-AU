import mongoose from "mongoose";
import { petDao } from "../../src/modules/pets/pet.dao.js";
import { expect } from "chai";

describe("Pet DAO Tests", () => {
    let petTest;

    before(async () => {
        await mongoose.connect("mongodb://localhost:27017/tests");
    });

    it("Should return an array of pets", async () => {
        const pets = await petDao.getAll();

        expect(pets).to.be.an("array");
    });

    it("Should create a pet", async () => {
        const newPet = {
            name: "Felix",
            specie: "Gato",
            birthDate: "10-12-2020",
            image: "dfdafkdasfakldf",
        };

        const pet = await petDao.create(newPet);
        petTest = pet;

        expect(pet).to.be.an("object");
        expect(pet).to.have.property("_id");
        expect(pet).to.have.property("name");
        expect(pet).to.have.property("specie");
        expect(pet).to.have.property("image");

        expect(pet).to.not.have.property("age");
    });

    it("Should obtain pet by ID", async () => {
        const pet = await petDao.getOne({ _id: petTest._id });

        expect(pet).to.be.an("object");
        expect(pet).to.have.property("_id");
        expect(pet).to.have.property("name");
        expect(pet).to.have.property("specie");
        expect(pet).to.have.property("image");

        expect(pet.name).to.be.equal("Felix");
    });

    it("Should update a pet", async () => {

        const petUpdateData = {
            name: "Pablo",
            specie: "Carpincho"
        };

        const petUpdate = await petDao.update(petTest._id, petUpdateData);

        expect(petUpdate).to.be.an("object");
        expect(petUpdate).to.have.property("_id");
        expect(petUpdate).to.have.property("name");
        expect(petUpdate).to.have.property("specie");
        expect(petUpdate).to.have.property("image");

        expect(petUpdate.name).to.be.equal("Pablo");
        expect(petUpdate.specie).to.be.equal("Carpincho");
    })

    it("Should delete a pet", async () => {
        await petDao.deleteOne(petTest._id);

        const pet = await petDao.getOne({ _id: petTest._id });

        expect(pet).to.be.null;
    })

    after(async () => {
        await petDao.deleteAll();
        await mongoose.disconnect();
    });
});
