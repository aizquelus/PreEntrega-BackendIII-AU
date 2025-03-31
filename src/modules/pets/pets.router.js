import { Router } from "express";
import { petController } from "./pet.controller.js";

const router = Router();

router.get("/", petController.getAll);
router.get("/:id", petController.getByID);
router.post("/", petController.create);

// Mocks
router.get("/mockingPets/:amount", petController.getPetsMocks);
router.post("/generateData/:amount", petController.createPetsMocks);

export default router;
