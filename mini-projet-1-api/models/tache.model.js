import mongoose from "mongoose";

// Même schéma que celui construit au Jour 7, appliqué cette fois à une
// vraie API plutôt qu'à un script isolé.
const tacheSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  titre: {
    type: String,
    required: true,
    minlength: 3,
  },
  terminee: { type: Boolean, default: false },
  creeLe: { type: Date, default: Date.now },
});

export const Tache = mongoose.model("Tache", tacheSchema);
