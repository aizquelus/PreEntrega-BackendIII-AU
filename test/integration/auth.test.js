import { expect } from "chai";
import supertest from "supertest";
import { isValidPassword } from "../../src/common/utils/hashPassword.js";


describe("Integration Tests for Auth Module", () => {
    const request = supertest("http://localhost:8080/api/");

    let userTest;

    it("[POST] /api/auth/register - Should register a new user", async () => {
        const newUser = {
            first_name: "Juan",
            last_name: "Perez",
            email: "jp@gmail.com",
            password: "123456",
        };

        const { status, body, error } = await request.post("auth/register").send(newUser);

        const checkPassword = isValidPassword(body, newUser.password);
        userTest = body;

        expect(status).to.be.equal(201);
        expect(body.first_name).to.be.equal("Juan");
        expect(body.last_name).to.be.equal("Perez");
        expect(body.email).to.be.equal("jp@gmail.com");
        expect(body.password).to.not.be.equal("123456");
        expect(checkPassword).to.be.equal(true);
        expect(body).to.be.an("object");
    });

    it("[POST] /api/auth/login - Should login", async () => {
        const data = {
            email: "jp@gmail.com",
            password: "123456",
        };

        const { status, body, error } = await request.post("auth/login").send(data);

        const { user } = body;
        expect(status).to.be.equal(200);
        expect(user.first_name).to.be.equal("Juan");
        expect(user.last_name).to.be.equal("Perez");
        expect(user.email).to.be.equal("jp@gmail.com");
        expect(user.password).to.not.be.equal("123456");
        expect(body.token).to.be.an("string");
    });

    after(async () => {
        try {
            await request.delete(`users/${userTest._id}`);
        } catch (error) {
            console.log(error);
        }

    });
});
