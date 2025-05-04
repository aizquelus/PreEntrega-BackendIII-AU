import { request, response } from "express";
import { petService } from "./pet.service.js";

class PetController {

    async create(req = request, res = response, next) {
        try {
            const petData = req.body;
            const pet = await petService.create(petData);

            res.status(201).json({ status: "success", pet });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req = request, res = response, next) {
        try {
            const pets = await petService.getAll();
        
            res.status(201).json({ status: "success", pets });
        } catch (error) {
            next(error);
        }
    }

    async getByID(req = request, res = response, next) {
        try {
            const { id } = req.params;
            const pet = await petService.getOne({ _id: id });

            res.status(201).json({ status: "success", pet });
        } catch (error) {
            next(error);
        }
    }

}

export const petController = new PetController();
