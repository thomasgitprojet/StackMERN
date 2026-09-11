# Jour 13 — CRUD complet depuis React

On reprend `jour-12-react-api` là où on l'a laissé et on ajoute la
création, la modification et la suppression de tâches — plus de données
en lecture seule.

Les deux serveurs (API + frontend) doivent toujours tourner en parallèle,
comme au Jour 12.

## 1. Créer une tâche

Dans `src/NouvelleTache.jsx` (nouveau fichier, déjà câblé dans
`ListeTachesAPI.jsx`) : un formulaire contrôlé avec un champ titre, qui
envoie un `POST` vers `/api/taches` et transmet la tâche créée au parent
via `onTacheCreee`. Toutes les instructions détaillées sont dans les
commentaires du fichier.

## 2. Cocher/décocher une tâche

Dans `ListeTachesAPI.jsx`, écris `basculerTache(id, tache)` : un `PUT`
vers `/api/taches/:id` qui inverse `terminee`, puis met à jour le state
local avec la version renvoyée par le serveur. Instructions détaillées
en commentaire en haut du fichier. Ajoute ensuite un `onClick` sur
chaque `<li>` (ou un bouton dédié) pour la déclencher.

## 3. Supprimer une tâche

Toujours dans `ListeTachesAPI.jsx`, écris `supprimerTacheAPI(id)` : un
`DELETE` vers `/api/taches/:id`, puis retire la tâche du state local.
Ajoute un bouton "Supprimer" sur chaque tâche.

## Test

1. Crée deux ou trois tâches depuis le formulaire.
2. Coche/décoche-les, vérifie que l'état persiste après un rafraîchissement
   de la page (preuve que ça vient bien du serveur, pas juste de l'état
   local).
3. Supprime-en une, vérifie qu'elle disparaît de l'écran ET de la base
   (recharge la page pour confirmer).
4. Vérifie aussi les cas d'erreur : que se passe-t-il si tu coupes le
   serveur au milieu d'une création ou d'une suppression ? L'interface
   doit rester utilisable, pas se figer.
