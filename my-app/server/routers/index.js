import express, { Router } from "express";
import productRouter from "./product";
import authRouter from "./auth";

const router = Router();

router.use("/products", productRouter);
router.use("/auth", authRouter);

export default router;
