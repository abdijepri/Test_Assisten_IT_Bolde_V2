import express from "express";
import {
  getUsers,
  Register,
  Login,
  LogOut,
  getUserById,
  updateUser,
} from "../controller/users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controller/refreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.patch("/users/:id", updateUser);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", LogOut);

export default router;
