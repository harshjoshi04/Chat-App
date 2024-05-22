import { Router } from "express";
import {
  GetAllUser,
  GetContact,
  GetRequest,
  GetUser,
  HandleRequest,
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
router.get("/contact/:id", GetContact);

// POST
router.post("/register", SigUpUser);
router.post("/login", LoginUser);
router.post("/platform", PlatForm);
router.post("/request", SendRequest);

// PUT
router.put("/request", HandleRequest);

export default router;
