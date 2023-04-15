import express, { Router } from "express";
import { signUpController } from "../controllers/auth";

const router: Router = express.Router();

router.post('/signup',signUpController);


export default router