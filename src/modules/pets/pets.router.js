import { Router } from "express";
import { petController } from "./pet.controller.js";
import { validateSchema } from "../../common/middlewares/validateSchema.js";
import { createPetSchema, updatePetSchema } from "./pet.schema.js";
import { objectIdSchema } from "../../common/schemas/objectId.schema.js";

const router = Router();

router.get("/", petController.getAll);
router.get("/:id", validateSchema(objectIdSchema), petController.getOne);
router.post("/", validateSchema(createPetSchema), petController.create);
router.put("/:id", validateSchema(updatePetSchema), petController.update);
router.delete("/:id", validateSchema(objectIdSchema), petController.deleteOne);

export default router;
