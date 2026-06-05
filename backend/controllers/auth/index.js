import { Router } from "express";
import loginRouter from "./login.js";
import registerRouter from "./register.js";
const router = Router();

router.use("/login", loginRouter);
router.use("/register", registerRouter);

export default router;
