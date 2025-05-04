import { Router } from 'express';
import userRouter from "../modules/users/user.router.js"
import petsRouter from "../modules/pets/pets.router.js"
import mocksRouter from "../modules/mocks/mocks.router.js"
import authRouter from "../modules/auth/auth.router.js"
import adoptionRouter from "../modules/adoptions/adoption.router.js"

const router = Router();

router.use("/users", userRouter);
router.use("/pets", petsRouter);
router.use("/mocks", mocksRouter);
router.use("/auth", authRouter);
router.use("/adoptions", adoptionRouter);

export default router;
