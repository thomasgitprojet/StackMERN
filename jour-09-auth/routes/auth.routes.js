// Routes : associent chaque URL + méthode HTTP à son contrôleur.
import express from "express";
import { register, login, profil } from "../controllers/auth.controller.js";
import { verifierToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profil", verifierToken, profil); // route protégée : passe par le middleware avant le contrôleur

export default router;
