import { request, response } from "express";
import { mocksService } from "../mocks/mocks.service.js";
import { BadRequestError } from "../../common/errors/errors.js";

class MocksController {

    async generateData(req = request, res = response, next) {
        try {
            const { users, pets } = req.query;

            if (!users && !pets) {
                throw new BadRequestError("You must provide at least one of the following query parameters: users or pets.");
            }

            const usersCount = users ? Math.max(Number(users), 0) : null;
            const petsCount = pets ? Math.max(Number(pets), 0) : null;

            if ((usersCount !== null && usersCount < 0) || (petsCount !== null && petsCount < 0)) {
                throw new BadRequestError("The amount of users and pets must be a positive number.");
            }

            const [generatedUsers, generatedPets] = await Promise.all([
                usersCount ? mocksService.createUsersMocks(usersCount) : null,
                petsCount ? mocksService.createPetsMocks(petsCount) : null,
            ]);

            res.status(201).json({
                status: "success",
                ...(generatedUsers && { users: generatedUsers }),
                ...(generatedPets && { pets: generatedPets }),
            });
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
