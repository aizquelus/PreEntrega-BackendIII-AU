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

    async getAll(req = request, res = response, next) {
        try {
            const users = await userService.getAll();
        
            res.status(200).json({ status: "success", users });
        } catch (error) {
            next(error);
        }
    }

    async getByID(req = request, res = response, next) {
        try {
            const { id } = req.params;
            const user = await userService.getOne({ _id: id });

            res.status(200).json({ status: "success", user });
        } catch (error) {
            next(error);
        }
    }

    async update(req = request, res = response, next) {
        try {
            const { id } = req.params;
            const userData = req.body;
            const user = await userService.update(id, userData);

            res.status(200).json({ status: "success", user });
        } catch (error) {
            next(error);
        }
    }

    async deleteOne(req = request, res = response, next) {
        try {
            const { id } = req.params;
            await userService.deleteOne(id);

            res.status(200).json({ status: "success", message: "User deleted" });
        } catch (error) {
            next(error);
        }
    }

    async deleteAll(req = request, res = response, next) {
        try {
            await userService.deleteAll();

            res.status(200).json({ status: "success", message: "Users deleted" });
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();
