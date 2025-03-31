import { request, response } from "express";
import { userService } from "./user.service.js";

class UserController {

    async create(req = request, res = response, next) {
        try {
            const userData = req.body;
            const user = await userService.create(userData);

            res.status(201).json({ status: "success", user });
        } catch (error) {
            next(error);
        }
    }

    async createUsersMocks(req = request, res = response, next) {
        try {
            const { amount } = req.params;
            const users = await userService.createUsersMocks(amount);

            res.status(201).json({ status: "success", users });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req = request, res = response, next) {
        try {
            const users = await userService.getAll();
        
            res.status(201).json({ status: "success", users });
        } catch (error) {
            next(error);
        }
    }

    async getByID(req = request, res = response, next) {
        try {
            const { id } = req.params;
            const user = await userService.getOne({ _id: id });

            res.status(201).json({ status: "success", user });
        } catch (error) {
            next(error);
        }
    }

    async getUsersMocks(req = request, res = response, next) {
        try {
            const { amount } = req.params;
            const users = await userService.getUsersMocks(amount);

            res.status(201).json({ status: "success", users });
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();
