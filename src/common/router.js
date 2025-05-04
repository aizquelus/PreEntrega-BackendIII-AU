import { Router } from 'express';
import userRouter from "../modules/users/user.router.js"
import petsRouter from "../modules/pets/pets.router.js"
import mocksRouter from "../modules/mocks/mocks.router.js"

const router = Router();

router.use("/users", userRouter);
router.use("/pets", petsRouter);
router.use("/mocks", mocksRouter);

export default router;
