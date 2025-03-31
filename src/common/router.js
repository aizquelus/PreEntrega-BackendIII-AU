import { Router } from 'express';
import userRouter from "../modules/users/user.router.js"
import petsRouter from "../modules/pets/pets.router.js"

const router = Router();

router.use("/users", userRouter);
router.use("/pets", petsRouter);

export default router;
