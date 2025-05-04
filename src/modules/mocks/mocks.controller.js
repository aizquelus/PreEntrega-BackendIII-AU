import { request, response } from "express";
import { mocksService } from "../mocks/mocks.service.js";
import { BadRequestError } from "../../common/errors/errors.js";

class MocksController {

    async generateData(req = request, res = response, next) {
        try {
            let { users, pets } = req.query;

            if (!users && !pets) throw new BadRequestError("You must provide at least one of the following query parameters: users or pets.");

            users = Number(users) || 0;
            pets = Number(pets) || 0;
            if (users < 0 || pets < 0) throw new BadRequestError("The amount of users and pets must be a positive number.");

            const generatedUsers = await mocksService.createUsersMocks(users);
            const generatedPets = await mocksService.createPetsMocks(pets);

            res.status(201).json({ status: "success", users: generatedUsers, pets: generatedPets });
        } catch (error) {
            next(error);
        }
    }

    async getUsersMocks(req = request, res = response, next) {
        try {
            const { amount } = req.query;
            const users = await mocksService.getUsersMocks(amount);

            res.status(201).json({ status: "success", users });
        } catch (error) {
            next(error);
        }
    }

    async getPetsMocks(req = request, res = response, next) {
        try {
            const { amount } = req.query;
            const pets = await mocksService.getPetsMocks(amount);

            res.status(201).json({ status: "success", pets });
        } catch (error) {
            next(error);
        }
    }
}

export const mocksController = new MocksController();
