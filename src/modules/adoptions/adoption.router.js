import { Router } from "express";
import { adoptionController } from "./adoption.controller.js";
import { validateSchema } from "../../common/middlewares/validateSchema.js";
import { createAdoptionSchema, getAdoptionSchema } from "./adoption.schema.js";

const router = Router();

router.get("/", adoptionController.getAll);
router.get("/:id", validateSchema(getAdoptionSchema), adoptionController.getOne);
router.post("/", validateSchema(createAdoptionSchema), adoptionController.create);
router.delete("/:id", validateSchema(getAdoptionSchema), adoptionController.deleteOne);

export default router;
