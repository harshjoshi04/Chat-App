import { Router } from "express";
import User from "./User";
const router = Router();

router.use("/user", User);

export default router;
