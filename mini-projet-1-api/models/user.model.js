import mongoose from "mongoose";

// Même schéma qu'au Jour 9, réutilisé tel quel — l'authentification n'est
// pas la nouveauté du jour, la relation Tache → User l'est.
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  creeLe: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
