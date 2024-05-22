import { Router } from "express";
import User from "./User";
import Message from "./Message";
const router = Router();

router.use("/user", User);
router.use("/message", Message);

export default router;
