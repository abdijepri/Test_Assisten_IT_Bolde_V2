import express from "express";
import { getUsers,Register,Login,LogOut } from "../controller/users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controller/refreshToken.js";

const router = express.Router();


router.get('/users',verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout',LogOut);


export default router;