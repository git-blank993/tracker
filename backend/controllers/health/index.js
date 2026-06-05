import { Router } from "express";
import dbRouter from "./db.js";
const router = Router();

router.use("/db", dbRouter);

export default router;
