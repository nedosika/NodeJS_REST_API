import express from "express";
import controller from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signUp', controller.signUp);
router.post('/signIn', controller.signIn);

export default router;