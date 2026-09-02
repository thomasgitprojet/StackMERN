// Routes : associent chaque URL + méthode HTTP à son contrôleur.
import { listerTaches, obtenirTache, creerTache, modifierTache, supprimerTache } from "../controllers/taches.controller.js";
import { verifierToken } from "../middlewares/auth.middleware.js";

import express from "express";
const router = express.Router();

router.get("/", verifierToken, listerTaches);
router.get("/:id", verifierToken, obtenirTache);
router.post("/", verifierToken, creerTache);
router.put("/:id", verifierToken, modifierTache);
router.delete("/:id", verifierToken, supprimerTache);
//
export default router;
