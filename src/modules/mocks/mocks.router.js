import { Router } from "express";
import { mocksController } from "./mocks.controller.js";

const router = Router();

router.get("/mockingUsers", mocksController.getUsersMocks);
router.get("/mockingPets", mocksController.getPetsMocks);
router.post("/generateData", mocksController.generateData);

export default router;