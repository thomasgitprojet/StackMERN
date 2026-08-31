import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";

await mongoose.connect(process.env.MONGO_URI);
console.log("Connecté à MongoDB");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Erreur serveur" });
});

app.listen(3000, () => console.log("serveur sur le port 3000"));
