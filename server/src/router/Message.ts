import { Router } from "express";
import { GetMessage, SendMessage, SetReaction } from "../controller/Message";

const router = Router();

// GET
router.get("/message", GetMessage);

// POST
router.post("/message", SendMessage);

// PUT
router.put("/message", SetReaction);

export default router;
