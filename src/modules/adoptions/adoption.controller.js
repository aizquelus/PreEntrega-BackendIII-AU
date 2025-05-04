import { request, response } from "express";
import { adoptionService } from "./adoption.service.js";

class AdoptionController {
    async getAll(req = request, res = response, next) {
        try {
            const adoptions = await adoptionService.getAll();

            res.status(200).json({ status: "success", adoptions });
        } catch (error) {
            next(error);
        }
    }
    async getOne(req = request, res = response, next) {
        try {
            const { id } = req.params;
            const adoption = await adoptionService.getOne({ _id: id });

            res.status(200).json({ status: "success", adoption });
        } catch (error) {
            next(error);
        }
    }
    async create(req = request, res = response, next) {
        try {
            const { owner, pet } = req.body;
            const adoption = await adoptionService.create(owner, pet);

            res.status(201).json({ status: "success", adoption });
        } catch (error) {
            next(error);
        }
    }

    async deleteOne(req = request, res = response, next) {
        try {
            const { id } = req.params;
            await adoptionService.deleteOne(id);

            res.status(200).json({ status: "success", message: "Adoption deleted" });
        } catch (error) {
            next(error);
        }
    }
}

export const adoptionController = new AdoptionController();
