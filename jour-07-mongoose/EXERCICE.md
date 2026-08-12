# Exercice Jour 7 — Mongoose, schémas et modèles

## Installation

```bash
npm install
```

Copie `.env.example` en `.env` (le vrai fichier, celui-ci n'est jamais
committé — déjà couvert par le `.gitignore` à la racine du dépôt) :

```bash
cp .env.example .env
```

`MONGO_URI` pointe vers la base `formation`, celle que tu as utilisée hier
dans Compass avec le conteneur `mongo-formation`. Assure-toi qu'il tourne
(`docker ps` ; sinon `docker start mongo-formation`).

## 1. Se connecter à MongoDB depuis Node

Dans `index.js`, connecte-toi avec Mongoose :

```javascript
import "dotenv/config";
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_URI);
console.log("Connecté à MongoDB");
```

Lance `npm start` et vérifie que "Connecté à MongoDB" s'affiche sans
erreur.

## 2. Schéma, modèle, insertion

Toujours dans `index.js` (ou un fichier séparé si tu préfères, à toi de
voir), définis un schéma `Tache` :

```javascript
const tacheSchema = new mongoose.Schema({
  titre: { type: String, required: true, minlength: 3 },
  terminee: { type: Boolean, default: false },
  creeLe: { type: Date, default: Date.now },
});

const Tache = mongoose.model("Tache", tacheSchema);
```

Écris un script qui insère 3 tâches (avec `Tache.create(...)`), puis les
affiche toutes (avec `Tache.find()`). Vérifie ensuite dans Compass que la
collection `taches` contient bien ces documents (Mongoose met le nom de la
collection au pluriel et en minuscules automatiquement à partir du nom du
modèle — `Tache` devient `taches`).

## 3. Validation personnalisée

Ajoute une règle de validation qui refuse un titre entièrement en
majuscules. Deux façons de faire, à toi de choisir (ou d'essayer les
deux) :

```javascript
// Option A : un validateur personnalisé dans le schéma
titre: {
  type: String,
  required: true,
  minlength: 3,
  validate: {
    validator: (valeur) => valeur !== valeur.toUpperCase(),
    message: "Le titre ne peut pas être entièrement en majuscules",
  },
},
```

Teste en essayant de créer une tâche avec un titre du type `"URGENT"`, et
observe le message d'erreur exact que Mongoose retourne dans la console
(`error.message`, ou explore l'objet `error.errors` pour voir le détail
par champ).
