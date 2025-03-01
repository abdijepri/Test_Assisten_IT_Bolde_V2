import express from "express";
import {
  getUsers,
  Register,
  Login,
  LogOut,
  getUserById,
  updateUser,
} from "../controller/usersController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { refreshToken } from "../controller/refreshToken.js";

const router = express.Router();

router.get("/users", authMiddleware, getUsers);
router.get("/users/:id", authMiddleware, getUserById);
router.patch("/users/update",authMiddleware, updateUser);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", LogOut);

export default router;
