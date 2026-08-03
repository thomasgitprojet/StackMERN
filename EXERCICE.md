# Exercice Jour 1 — Réécrire du `.then()` en `async`/`await`

## Installation

```bash
npm install
npm run dev
```

Ouvre l'URL affichée dans le terminal (en général `http://localhost:5173`).

## Ce qu'il y a à faire

Le fichier `src/api.js` contient 3 fonctions écrites à l'ancienne, avec des
chaînes `.then()`/`.catch()`, comme dans un projet React qui n'a pas encore
été modernisé :

1. `getUtilisateurs()` — un simple `fetch` avec un `.then()`.
2. `getUtilisateurAvecPosts(id)` — deux appels `fetch` enchaînés (le
   deuxième dépend du résultat du premier). C'est le cas le plus parlant :
   les `.then()` imbriqués vont se transformer en deux `await` d'affilée.
3. `creerPost(titre, corps, utilisateurId)` — un `fetch` en `POST`.

**Consigne :** réécris ces 3 fonctions avec `async`/`await` et `try/catch`,
sans changer leur signature ni leur comportement (mêmes valeurs retournées,
mêmes messages d'erreur). Ne touche pas à `App.jsx` — si ta conversion est
correcte, l'application doit continuer à fonctionner exactement pareil
(liste des utilisateurs, bouton "Voir détail", bouton "Créer un post de
test").

## Pour aller plus loin (facultatif, si tu as le temps)

- Utilise `Promise.all` pour charger `getUtilisateurs()` et une deuxième
  information en parallèle, et compare le temps de chargement avec deux
  `await` séquentiels.
- Ajoute un état de chargement séparé pour le bouton "Créer un post de
  test", pour éviter les double-clics pendant que la requête est en cours.
