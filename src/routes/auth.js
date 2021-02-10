import express from "express";
import controller from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup', controller.signUp);
router.post('/signin', controller.signIn);

export default router;