import express from "express";
import authenticateJWT from "../utils/authenticateJWT.js";
import controller from "../controllers/user.controller.js";

const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

router.get("/", authenticateJWT, controller.getAllUsers);
router.get("/:id", authenticateJWT, controller.getUser);
router.post("/", authenticateJWT, controller.addUser);
router.put("/", authenticateJWT, controller.updateUser);
router.delete("/:id", authenticateJWT, controller.removeUser);

export default router;