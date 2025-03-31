import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getByID);
router.post("/", userController.create);

// Mocks
router.get("/mockingUsers/:amount", userController.getUsersMocks);
router.post("/generateData/:amount", userController.createUsersMocks);

export default router;
