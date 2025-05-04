import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getByID);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.deleteOne);
router.delete("/", userController.deleteAll);

export default router;
