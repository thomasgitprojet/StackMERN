import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import tachesRoutes from "./routes/taches.routes.js";
import authRoutes from "./routes/auth.routes.js";

await mongoose.connect(process.env.MONGO_URI);
console.log("Connecté à MongoDB");

const app = express();
// Le frontend React (Jour 12, servi par Vite sur un autre port) et cette
// API ne partagent pas la même origine — sans ce middleware, le navigateur
// bloquerait les requêtes fetch envoyées depuis React. Pas la nouveauté
// pédagogique du jour, juste un prérequis technique pour que ça fonctionne.
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/taches", tachesRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Erreur serveur" });
});

app.listen(3000, () => console.log("serveur sur le port 3000"));
