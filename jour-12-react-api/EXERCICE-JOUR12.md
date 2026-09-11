# Jour 12 — useEffect et connexion à une vraie API

Aujourd'hui, le frontend React se connecte à `mini-projet-1-api` (Jours
8-10) — connexion, récupération des tâches protégées par JWT.

## Préparatifs

Deux serveurs doivent tourner en même temps, dans deux terminaux
séparés :

```bash
# Terminal 1 — l'API
cd mini-projet-1-api
npm install    # nouveauté : le paquet `cors` a été ajouté
npm run dev

# Terminal 2 — le frontend React
cd jour-12-react-api
npm install
npm run dev
```

`cors` a été ajouté et activé dans `mini-projet-1-api/index.js`
(`app.use(cors())`) — sans lui, le navigateur bloquerait les requêtes
`fetch` envoyées depuis React (deux origines différentes : le port de
Vite et le port 3000 de l'API). Ce n'est pas la nouveauté pédagogique du
jour, juste un prérequis technique.

Assure-toi d'avoir au moins un compte existant dans `mini_projet_taches`
(créé via `POST /api/auth/register` au Jour 9/10, ou directement avec
`requests.http` dans `mini-projet-1-api/`) et une tâche associée, pour
avoir quelque chose à afficher.

## 1. `Connexion.jsx` — formulaire + fetch POST

Formulaire contrôlé (email, mot de passe), soumission qui appelle
`POST /api/auth/login`, et transmet le token reçu au parent via la prop
`onConnexion`. Toutes les instructions détaillées sont dans les
commentaires du fichier.

Doc utile : [Formulaires contrôlés](https://fr.react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable).

## 2. `ListeTachesAPI.jsx` — useEffect + fetch GET

Récupère la liste des tâches de l'utilisateur connecté au montage du
composant, avec gestion du chargement et des erreurs. Instructions
détaillées dans les commentaires du fichier.

Doc utile : [useEffect](https://fr.react.dev/reference/react/useEffect),
[Synchroniser avec des Effects](https://fr.react.dev/learn/synchronizing-with-effects).

## Test

1. Ouvre l'app React, connecte-toi avec un compte existant.
2. Vérifie que la liste de tes tâches s'affiche après un court instant de
   chargement.
3. Coupe le serveur API (`Ctrl+C` dans le terminal 1) et recharge la page
   React après une nouvelle tentative de connexion — vérifie que le
   message d'erreur s'affiche correctement plutôt qu'un écran blanc ou un
   plantage.
