import { Router } from "express";
import {
  GetAllUser,
  GetRequest,
  GetUser,
  LoginUser,
  PlatForm,
  SendRequest,
  SigUpUser,
} from "../controller/User";

const router = Router();

// GET
router.get("/user", GetUser);
router.get("/all-user", GetAllUser);
router.get("/request/:id", GetRequest);

// POST
router.post("/register", SigUpUser);
router.post("/login", LoginUser);
router.post("/platform", PlatForm);
router.post("/request", SendRequest);

export default router;
