import express, { Router } from "express";
import { getUser } from "../controllers/user";
import { authMiddleware } from "../middleware/auth";
import { MiddlewareFunction } from "../types";
const router: Router = express.Router();

router.get('/',authMiddleware as MiddlewareFunction,getUser as any)

export default router