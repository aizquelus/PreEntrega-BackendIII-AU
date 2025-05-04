import mongoose from "mongoose";
import { userDao } from "../../src/modules/users/user.dao.js";
import { expect } from "chai";

describe("User DAO Tests", () => {
    let userTest;

    before(async () => {
        await mongoose.connect("mongodb://localhost:27017/tests");
    });

    it("Should return an array of users", async () => {
        const users = await userDao.getAll();

        expect(users).to.be.an("array");
    });

    it("Should create an user", async () => {
        const newUser = {
            first_name: "Juan",
            last_name: "Perez",
            email: "jp@gmail.com",
            password: "123456",
        };

        const user = await userDao.create(newUser);
        userTest = user;

        expect(user).to.be.an("object");
        expect(user).to.have.property("_id");
        expect(user).to.have.property("first_name");
        expect(user).to.have.property("last_name");
        expect(user).to.have.property("email");
        expect(user).to.have.property("password");
        expect(user.first_name).to.be.equal("Juan");

        expect(user).to.not.have.property("age");
    });

    it("Should obtain an user by ID", async () => {
        const user = await userDao.getOne({ _id: userTest._id });

        expect(user).to.be.an("object");
        expect(user).to.have.property("_id");
        expect(user).to.have.property("first_name");
        expect(user).to.have.property("last_name");
        expect(user).to.have.property("email");
        expect(user).to.have.property("password");

        expect(user.first_name).to.be.equal("Juan");
    });

    it("Should update an user", async () => {
        const userUpdateData = {
            first_name: "Pepe",
            last_name: "Sapo",
        };

        const userUpdate = await userDao.update(userTest._id, userUpdateData);

        expect(userUpdate).to.be.an("object");
        expect(userUpdate).to.have.property("_id");
        expect(userUpdate).to.have.property("first_name");
        expect(userUpdate).to.have.property("last_name");
        expect(userUpdate).to.have.property("email");
        expect(userUpdate).to.have.property("password");

        expect(userUpdate.first_name).to.be.equal("Pepe");
        expect(userUpdate.last_name).to.be.equal("Sapo");
    });

    it("Should delete an user", async () => {
        await userDao.deleteOne(userTest._id);

        const user = await userDao.getOne({ _id: userTest._id });

        expect(user).to.be.null;
    });

    after(async () => {
        await userDao.deleteAll();
        await mongoose.disconnect();
    });
});
