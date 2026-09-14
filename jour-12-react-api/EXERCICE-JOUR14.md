# Jour 14 — React Router

On reprend `jour-12-react-api` et on ajoute une vraie navigation entre
plusieurs URLs, au lieu du rendu conditionnel basé uniquement sur le
state `token`.

Les deux serveurs (API + frontend) doivent toujours tourner en parallèle.

## Installation

`react-router-dom` a été ajouté à `package.json`. Lance :

```
npm install
```

## 1. Mettre en place le routeur

Dans `src/main.jsx`, importe `BrowserRouter` depuis `react-router-dom`
et enveloppe `<App />` avec.

## 2. Déclarer les routes

Dans `src/App.jsx`, remplace le rendu conditionnel actuel
(`{!token ? <Connexion/> : <ListeTachesAPI/>}`) par une déclaration de
routes avec `<Routes>` et `<Route path="..." element={...} />` :

- `/login` → `<Connexion onConnexion={...} />`
- `/taches` → `<ListeTachesAPI token={token} />`

Utilise `useNavigate()` dans `App.jsx` (ou transmets-le à `Connexion` via
une prop) pour rediriger vers `/taches` une fois `onConnexion` appelé,
au lieu de compter uniquement sur le changement de state pour changer
l'affichage.

Réfléchis aussi à une route racine `/` : que doit-il se passer si on y
arrive directement ?

## 3. Protéger la route `/taches`

Si `token` est `null` et qu'on essaie d'afficher `/taches`, il faut
rediriger vers `/login` au lieu d'afficher la page (regarde le composant
`<Navigate>` de `react-router-dom` pour ça).

Question à te poser une fois que ça fonctionne : que se passe-t-il si tu
rafraîchis la page pendant que tu es sur `/taches` ? Pourquoi ? (Pas
besoin de le résoudre aujourd'hui — on y reviendra.)

## 4. Page de détail d'une tâche

Complète `src/TacheDetail.jsx` (déjà créé, voir les commentaires à
l'intérieur) : une page affichée sur `/taches/:id` qui récupère l'id
depuis l'URL et affiche le détail d'une tâche.

Ajoute la route correspondante dans `App.jsx`, puis modifie
`ListeTachesAPI.jsx` pour que le titre de chaque tâche soit un
`<Link to={...}>` vers sa page de détail.

## Test

1. Connecte-toi, vérifie que tu es bien redirigé vers `/taches` sans
   rechargement de page.
2. Clique sur une tâche, vérifie que l'URL change et que le détail
   s'affiche.
3. Utilise le lien retour, vérifie que tu reviens à la liste.
4. Essaie d'aller directement sur `/taches` dans la barre d'adresse sans
   être connecté : es-tu bien redirigé vers `/login` ?
