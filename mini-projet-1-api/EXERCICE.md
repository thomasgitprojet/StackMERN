# Mini-projet 1 — API "Gestionnaire de tâches" en mémoire

L'objectif de vendredi : assembler tout ce qui a été vu cette semaine (JS
asynchrone, Node, Express, middlewares) dans une API complète et propre,
sans base de données — un tableau en mémoire suffit, MongoDB arrive
seulement la semaine prochaine.

## Installation

```bash
npm install
```

## Ce qui est déjà en place

- `controllers/taches.controller.js` — contient le tableau `taches` de
  départ. À toi d'y écrire les fonctions contrôleurs.
- `routes/taches.routes.js` — un squelette commenté qui utilise
  `express.Router()`, un concept qu'on n'a pas encore vu explicitement.

## Nouveau concept : `express.Router()`

Jusqu'ici, tu déclarais tes routes directement sur `app` (`app.get(...)`,
`app.post(...)`). `express.Router()` crée un **mini-routeur indépendant**,
qu'on peut définir dans un fichier séparé puis "brancher" sur l'application
principale avec `app.use()`. C'est ce qui permet de séparer proprement les
routes par ressource (toutes les routes de `taches` dans un seul fichier)
plutôt que de tout empiler dans `index.js`.

```javascript
// routes/taches.routes.js
import express from "express";
const router = express.Router();

router.get("/", (req, res) => { /* ... */ });

export default router;

// index.js
import tachesRoutes from "./routes/taches.routes.js";
app.use("/api/taches", tachesRoutes);
```

Remarque le préfixe `"/api/taches"` dans `app.use()` : toutes les routes
définies dans `taches.routes.js` (`router.get("/")`, `router.get("/:id")`...)
viennent se greffer **après** ce préfixe. Donc `router.get("/:id")`
correspond en réalité à `GET /api/taches/:id`.

## Fonctionnalités à construire

Cinq routes complètes, reliées à leurs contrôleurs :

- `GET /api/taches` — liste toutes les tâches.
- `GET /api/taches/:id` — une tâche précise ; `404` si l'id n'existe pas.
- `POST /api/taches` — crée une tâche ; `400` si `titre` est absent ou trop
  court (moins de 3 caractères, par exemple).
- `PUT /api/taches/:id` — modifie une tâche existante ; `404` si absente.
- `DELETE /api/taches/:id` — supprime une tâche ; `404` si absente.

## Attentes de qualité

- Validation systématique des données entrantes sur `POST`/`PUT` (pas de
  confiance aveugle en `req.body`).
- Codes de statut cohérents partout (`200`, `201` à la création, `400`,
  `404`) — jamais un `200` générique qui cache une erreur.
- Un format de réponse cohérent sur toute l'API (à toi de choisir : par
  exemple toujours renvoyer directement l'objet/le tableau, ou toujours
  `{ data }` / `{ erreur }` — l'important est la cohérence, pas le choix
  précis).
- Le fichier `index.js` ne doit contenir que la configuration de
  l'application (middlewares, branchement des routes, `listen`) — toute la
  logique métier vit dans `controllers/`.

## Pour tester

Utilise l'extension REST Client (comme au Jour 4) ou `curl` — un fichier
`requests.http` vide t'attend, complète-le avec les 5 requêtes.

Rappel du Jour 4 : lance avec `npm run dev` pendant que tu codes (le script
est configuré pour ne surveiller que `index.js`, `routes/` et
`controllers/` — pas de risque qu'un fichier `.http` déclenche un
redémarrage en pleine requête). Si tu enchaînes beaucoup de tests rapides,
`node index.js` tout court reste l'option la plus prévisible.
