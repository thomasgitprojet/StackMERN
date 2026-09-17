# Jour 15 — Context API & persistance de la connexion

On reprend `jour-12-react-api` : le token ne sera plus passé en props de
composant en composant, et il survivra à un rafraîchissement de page.

Les deux serveurs (API + frontend) doivent toujours tourner en parallèle.

## 1. Compléter `AuthContext.jsx`

Le fichier `src/AuthContext.jsx` est déjà créé avec la structure et les
instructions détaillées en commentaire. Complète-le : state `token`
initialisé depuis `localStorage`, fonctions `connecter`/`deconnecter`
qui synchronisent state et `localStorage`, et le `value` fourni par
`AuthContext.Provider`.

## 2. Envelopper l'application avec `AuthProvider`

Dans `main.jsx`, importe `AuthProvider` et enveloppe `<App />` avec —
réfléchis à l'ordre par rapport à `<BrowserRouter>` (est-ce que ça a de
l'importance ici ? pourquoi ?).

## 3. Adapter `App.jsx`

Supprime le `useState(null)` pour `token` dans `App` — cette donnée vit
maintenant dans `AuthContext`. Utilise `useContext(AuthContext)` (import
`{ useContext }` depuis `"react"`, et `{ AuthContext }` depuis
`"./AuthContext.jsx"`) pour récupérer `token` directement dans `App`.

Adapte les routes : la route `/login` n'a plus besoin de recevoir
`onConnexion={setToken}` — `Connexion` ira chercher `connecter`
directement dans le contexte (étape suivante). `RouteProtegee` continue
de fonctionner à l'identique, seule la provenance de `token` change.

## 4. Adapter `Connexion.jsx`

Ce composant ne reçoit plus `onConnexion` en prop. Utilise
`useContext(AuthContext)` pour récupérer `connecter`, et appelle
`connecter(token)` à la place de `onConnexion(token)` après une
connexion réussie.

## 5. Adapter `ListeTachesAPI.jsx` et `TacheDetail.jsx`

Ces deux composants ne reçoivent plus `token` en prop non plus — ils le
récupèrent directement via `useContext(AuthContext)`. Pense à retirer
`token` de la liste des props reçues par chaque composant, et à retirer
`token={token}` des endroits où tu les utilisais (dans `App.jsx`, et
dans `NouvelleTache` si besoin).

## 6. Se déconnecter

Ajoute un bouton "Déconnexion" quelque part (par exemple dans
`ListeTachesAPI.jsx`) qui appelle `deconnecter()` puis redirige vers
`/login` avec `useNavigate()`.

## Test

1. Connecte-toi, vérifie que tout fonctionne comme avant (liste, détail,
   création, modification, suppression).
2. Rafraîchis la page (F5) pendant que tu es sur `/taches` : es-tu
   toujours connecté ? Compare avec le comportement du Jour 14.
3. Déconnecte-toi, vérifie dans les outils de développement du
   navigateur (onglet Application/Stockage) que la clé `token` a bien
   disparu de `localStorage`.
4. Essaie d'aller sur `/taches` juste après une déconnexion : es-tu bien
   redirigé vers `/login` ?
