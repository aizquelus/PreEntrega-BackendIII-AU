import { expect } from "chai";
import supertest from "supertest";

describe("Integration Tests for Adoptions Module", () => {
    const request = supertest("http://localhost:8080/api");

    let adoptionTest;
    let userTest;
    let petTest;

    before(async () => {
        let { body: bodyUser } = await request.post("/users").send({
            first_name: "Pepito",
            last_name: "Perez",
            email: "pp@mail.com",
            password: "123456"
        });
        userTest = bodyUser.user;
    
        let { body: bodyPet } = await request.post("/pets").send({
            name: "Felix",
            specie: "Gato",
            birthDate: "10-12-2020",
            image: "dfdafkdasfakldf",
        });
        petTest = bodyPet.pet;
    });

    it("[POST] /api/adoptions - Should create a new adoption", async () => {
        const { status, body, error } = await request.post("/adoptions").send({owner: userTest._id, pet: petTest._id});
        adoptionTest = body.adoption;

        expect(status).to.be.equal(201);
        expect(adoptionTest).to.have.property("_id");
        expect(adoptionTest).to.have.property("owner");
        expect(adoptionTest).to.have.property("pet");
        expect(adoptionTest.owner).to.be.equal(userTest._id);
        expect(adoptionTest.pet).to.be.equal(petTest._id);
    });

    it("[POST] /api/adoptions - Should not create a new adoption without owner", async () => {
        const { status, body, error } = await request.post("/adoptions").send({pet: petTest._id});

        expect(status).to.be.equal(400);
        expect(body).to.have.property("errors");
    });

    it("[POST] /api/adoptions - Should not create a new adoption without pet", async () => {
        const { status, body, error } = await request.post("/adoptions").send({owner: userTest._id});

        expect(status).to.be.equal(400);
        expect(body).to.have.property("errors");
    });

    it("[GET] /api/adoptions - Should obtain all adoptions", async () => {
        const { status, body, error } = await request.get("/adoptions");

        expect(status).to.be.equal(200);
        expect(body).to.have.property("adoptions");
        expect(body.adoptions).to.be.an("array");
        expect(body.adoptions[0]).to.have.property("_id");
        expect(body.adoptions[0]).to.have.property("owner");
        expect(body.adoptions[0]).to.have.property("pet");
    });

    it("[GET] /api/adoptions - Should obtain an adoption", async () => {
        const { status, body, error } = await request.get(`/adoptions/${adoptionTest._id}`);

        expect(status).to.be.equal(200);
        expect(body).to.have.property("adoption");
        expect(body.adoption).to.have.property("_id");
        expect(body.adoption).to.have.property("owner");
        expect(body.adoption).to.have.property("pet");
        expect(body.adoption._id).to.be.equal(adoptionTest._id);
        expect(body.adoption.owner._id).to.be.equal(userTest._id);
        expect(body.adoption.pet._id).to.be.equal(petTest._id);
    });

    it("[DELETE] /api/adoptions - Should delete an adoption", async () => {
        const { status, body, error } = await request.delete(`/adoptions/${adoptionTest._id}`);

        expect(status).to.be.equal(200);
        expect(body).to.have.property("message");
        expect(body).to.have.property("status");
        expect(body.status).to.be.equal("success");
        expect(body.message).to.be.equal("Adoption deleted");

        const { status: getStatus } = await request.get(`/adoptions/${adoptionTest._id}`);
        expect(getStatus).to.be.equal(404);
    });

    after(async () => {
        try {
            await request.delete(`/users/${userTest._id}`);
            await request.delete(`/pets/${petTest._id}`);
        } catch (error) {
            console.log(error);
        }

    });
});
