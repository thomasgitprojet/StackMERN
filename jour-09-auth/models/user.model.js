import mongoose from "mongoose";

// Schéma minimal pour l'authentification : email unique, mot de passe
// haché (jamais en clair — le hachage se fait dans le contrôleur, ce
// schéma se contente de stocker la chaîne déjà hachée).
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
