import { Router } from "express";
import { forgotPasswords, Login, Register } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.post("/forgotPassword", forgotPasswords); // Đã sửa đổi ở đây

export default authRouter;
