# Jour 10 — Consolidation : tâches liées à un utilisateur

Ce qui est déjà en place (repris tel quel du Jour 9, ce n'est pas la
nouveauté du jour) :

- `models/user.model.js`, `controllers/auth.controller.js`,
  `middlewares/auth.middleware.js`, `routes/auth.routes.js` → inscription,
  connexion, `verifierToken`.
- `index.js` → monte maintenant `/api/auth` en plus de `/api/taches`.
- `.env.example` → ajoute `JWT_SECRET` en plus de `MONGO_URI` (même base
  `mini_projet_taches` — les utilisateurs et les tâches vivent dans la
  même base maintenant, dans deux collections différentes).

```bash
npm install
docker ps
cp .env.example .env   # (Copy-Item .env.example .env sous PowerShell)
```

La nouveauté du jour, c'est de relier chaque tâche à son propriétaire, et
de faire respecter cette propriété.

## 1. Ajouter la relation dans le schéma

Dans `models/tache.model.js`, ajoute un champ `utilisateur` qui référence
un document `User` :

```javascript
utilisateur: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
```

## 2. Protéger les routes de tâches

Dans `routes/taches.routes.js`, importe `verifierToken` (depuis
`../middlewares/auth.middleware.js`) et ajoute-le comme middleware sur
les 5 routes existantes, avant le contrôleur — exactement comme pour
`/api/auth/profil` au Jour 9.

## 3. Associer chaque tâche créée à son créateur

Dans `controllers/taches.controller.js`, fonction `creerTache` : grâce au
middleware, `req.user` est disponible. Passe `utilisateur: req.user._id`
à `Tache.create(...)` en plus du `titre`.

## 4. Vérifier la propriété avant de modifier/supprimer

Dans `modifierTache` et `supprimerTache` : après avoir récupéré la tâche
(avant de la modifier/supprimer), compare son propriétaire à
l'utilisateur connecté. Attention : `tache.utilisateur` et `req.user._id`
sont tous les deux des `ObjectId`, pas des chaînes — les comparer avec
`===` ne fonctionne pas de manière fiable (deux objets différents en
mémoire, même s'ils représentent le même id). Utilise soit
`tache.utilisateur.equals(req.user._id)`, soit convertis les deux en
chaînes avec `.toString()` avant de comparer.

Si ça ne correspond pas, renvoie une erreur `403` ("Interdit" — la
requête est authentifiée mais pas autorisée à agir sur cette ressource,
à distinguer du `401` qu'on renvoie quand le token est absent/invalide).

## 5. Tester

Avec `requests.http` :

1. Crée deux comptes différents (deux emails), récupère un token pour
   chacun.
2. Avec le token du compte A, crée une tâche.
3. Avec le token du compte A, modifie/supprime cette tâche → doit
   fonctionner.
4. Avec le token du compte B, tente de modifier/supprimer la tâche créée
   par A → doit renvoyer `403`.
5. Sans token du tout → doit renvoyer `401` (le middleware bloque avant
   même d'atteindre le contrôleur).

## Bonus (facultatif)

`listerTaches` renvoie actuellement toutes les tâches, tous utilisateurs
confondus. Réfléchis à comment ne renvoyer que celles de l'utilisateur
connecté (indice : `Tache.find({ utilisateur: req.user._id })` plutôt que
`Tache.find()`).
