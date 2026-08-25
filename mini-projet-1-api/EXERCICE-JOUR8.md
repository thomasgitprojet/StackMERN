# Jour 8 — Brancher Express + Mongoose (CRUD complet)

Ce qui est déjà en place, pour éviter de refaire le Jour 7 :

- `.env.example` → copie-le en `.env` (`cp .env.example .env`). Il pointe
  vers une base dédiée, `mini_projet_taches`, séparée de celle du Jour 7.
- `models/tache.model.js` → le même schéma qu'hier (`titre`, `terminee`,
  `creeLe`), sans le validateur "pas de majuscules" cette fois — à toi de
  l'ajouter si tu veux, ce n'est pas demandé aujourd'hui.
- `index.js` → connexion Mongoose déjà ajoutée, avant le démarrage du
  serveur.

```bash
npm install
docker ps   # vérifie que mongo-formation tourne (ou démarre-le)
cp .env.example .env
```

## 1. Migrer les 5 routes

Ouvre `controllers/taches.controller.js`. Le tableau `taches` en mémoire et
les 5 fonctions sont toujours là — c'est ton point de départ. Remplace,
fonction par fonction, les opérations sur le tableau par les méthodes
Mongoose équivalentes sur le modèle `Tache` (`import { Tache } from
"../models/tache.model.js";`) :

| Avant (tableau) | Après (Mongoose) |
|---|---|
| `taches` | `Tache.find()` |
| `taches.find(t => t.id === id)` | `Tache.findById(id)` |
| `taches.push(...)` | `Tache.create(...)` |
| mutation directe + `res.json` | `Tache.findByIdAndUpdate(id, données, { new: true })` |
| `taches.splice(...)` | `Tache.findByIdAndDelete(id)` |

Point d'attention, revu en théorie hier : `findById`, comme `find`, prend
l'identifiant MongoDB (`_id`, un `ObjectId`), pas un entier auto-incrémenté
comme ton `id` en mémoire. Si quelqu'un envoie un id mal formé dans l'URL
(`/api/taches/abc`), Mongoose lève une erreur spécifique — à toi de la
repérer et de la transformer en réponse `400`, pas en erreur `500` brute.

`findByIdAndUpdate(id, données, { new: true })` : sans `{ new: true }`,
Mongoose retourne par défaut le document **avant** modification, pas
après — un piège classique si tu veux renvoyer la version à jour au client.

## 2. Middleware de gestion d'erreurs centralisé

Plutôt que de dupliquer un `try/catch` dans chaque fonction du contrôleur,
regroupe la gestion des erreurs dans un middleware placé en dernier dans
`index.js` :

```javascript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Erreur serveur" });
});
```

Un middleware à **quatre paramètres** (`err, req, res, next`) est reconnu
par Express comme un middleware d'erreurs — il ne s'exécute que si une
erreur lui est explicitement transmise via `next(err)` (à appeler dans tes
contrôleurs en cas d'erreur inattendue), ou si une erreur est levée dans
une fonction non-async.

## 3. Tester chaque route

Avec `requests.http` (déjà présent), vérifie pour chaque route au moins
ces cas :

- Succès (donnée valide, id existant).
- Id syntaxiquement invalide (`/api/taches/abc`) → `400`.
- Id valide mais inexistant → `404`.
- Validation échouée sur `POST`/`PUT` (titre trop court) → `400`.

Note les codes de statut obtenus à chaque test — si l'un d'eux ne
correspond pas à ce que tu attends, c'est le signal qu'il manque une
vérification quelque part dans le contrôleur.
