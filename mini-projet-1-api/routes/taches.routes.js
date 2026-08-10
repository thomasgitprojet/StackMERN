// Routes : associent chaque URL + méthode HTTP à son contrôleur.
import { listerTaches, obtenirTache, creerTache, modifierTache, supprimerTache } from "../controllers/taches.controller.js";
//
import express from "express";
const router = express.Router();

router.get("/", listerTaches);
router.get("/:id", obtenirTache);
router.post("/", creerTache);
router.put("/:id", modifierTache);
router.delete("/:id", supprimerTache);
//
export default router;
