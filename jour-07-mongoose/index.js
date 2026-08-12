import "dotenv/config";
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_URI);
console.log("Connecté à MongoDB");

const tacheSchema = new mongoose.Schema({
  titre: { type: String,
    required: true,
    minlength: 3,
    validate: {
        validator: (valeur) => valeur !== valeur.toUpperCase(),
        message: "Le titre ne peut pas être entièrement en majuscules",
    }, },
  terminee: { type: Boolean, default: false },
  creeLe: { type: Date, default: Date.now },
});

const Tache = mongoose.model("Tache", tacheSchema);

async function creerTaches(titres) {
  try {
    const documents = titres.map((titre) => ({ titre }));
    const taches = await Tache.insertMany(documents);
    console.log(taches);
  } catch (error) {
    console.error(error.message);
  }
}

await creerTaches(["Faire les courses", "Réviser Mongoose", "Ranger le bureau"]);

const toutesLesTaches = await Tache.find();
console.log(toutesLesTaches);