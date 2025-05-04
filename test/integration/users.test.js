import { expect } from "chai";
import supertest from "supertest";

describe("Integration Tests for Users Module", () => {
    const request = supertest("http://localhost:8080/api");

    let userTest;
    let userNameTest = "Lolo";
    let userLastNameTest = "Mirando";
    let userEmailTest = "lolom@mail.com";
    let userNameTestUpdate = "Mirta";
    let userLastNameTestUpdate = "Legrand";

    it("[POST] /api/users - Should create a new user", async () => {
        const newUser = {
            first_name: userNameTest,
            last_name: userLastNameTest,
            email: userEmailTest,
            password: "123456",
        };

        const { status, body } = await request.post("/users").send(newUser);

        const { user } = body;
        userTest = user;

        expect(status).to.be.equal(201);
        expect(user).to.have.property("_id");
        expect(user).to.have.property("first_name");
        expect(user).to.have.property("last_name");
        expect(user).to.have.property("email");
        expect(user.first_name).to.be.equal(userNameTest);
        expect(user.last_name).to.be.equal(userLastNameTest);
        expect(user.email).to.be.equal(userEmailTest);
        expect(user.password).to.be.undefined;
    });

    it("[PUT] /api/users/:id - Should update a user", async () => {
        const updateUser = {
            first_name: userNameTestUpdate,
            last_name: userLastNameTestUpdate
        };

        const { status, body, error } = await request.put(`/users/${userTest._id}`).send(updateUser);

        const { user } = body;
        userTest = user;

        expect(status).to.be.equal(200);
        expect(user).to.have.property("_id");
        expect(user).to.have.property("first_name");
        expect(user).to.have.property("last_name");
        expect(user).to.have.property("email");
        expect(user.first_name).to.be.equal(userNameTestUpdate);
        expect(user.last_name).to.be.equal(userLastNameTestUpdate);
        expect(user.email).to.be.equal(userEmailTest);
    });

    it("[GET] /api/users/:id - Should return a user", async () => {
        const { status, body, error } = await request.get(`/users/${userTest._id}`);

        const { user } = body;

        expect(status).to.be.equal(200);
        expect(user).to.have.property("first_name");
        expect(user).to.have.property("last_name");
        expect(user).to.have.property("email");
        expect(user.first_name).to.be.equal(userNameTestUpdate);
        expect(user.last_name).to.be.equal(userLastNameTestUpdate);
        expect(user.email).to.be.equal(userEmailTest);
    });

    it("[DELETE] /api/users/:id - Should delete a user", async () => {
        const { status, body, error } = await request.delete(`/users/${userTest._id}`);

        expect(status).to.be.equal(200);
        expect(body.user).to.be.undefined;

        const { status: getStatus } = await request.get(`/users/${userTest._id}`);
        expect(getStatus).to.be.equal(404);
    });
});
