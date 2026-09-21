# Jour 16 — Hook personnalisé : useFetch

On reprend `jour-12-react-api`. `ListeTachesAPI.jsx` et `TacheDetail.jsx`
contiennent chacun le même pattern : trois states (données, chargement,
erreur), un `useEffect`, un fetch avec en-tête `Authorization`. On extrait
ça dans un hook réutilisable.

Les deux serveurs (API + frontend) doivent toujours tourner en parallèle.

## 1. Écrire `useFetch`

Le fichier `src/useFetch.js` est déjà créé avec la structure et les
instructions détaillées en commentaire. Complète-le.

## 2. Refactoriser `TacheDetail.jsx`

Remplace les trois `useState` + le `useEffect` de `TacheDetail` par un
seul appel :

```javascript
const { donnees: tache, chargement, erreur } = useFetch(`http://localhost:3000/api/taches/${id}`);
```

(le renommage `donnees: tache` te permet de garder le reste du JSX
inchangé, sans devoir remplacer `tache` par `donnees` partout).

Le composant doit continuer à se comporter exactement comme avant :
chargement, erreur, affichage du détail, lien retour.

## 3. Bonus : refactoriser `ListeTachesAPI.jsx`

Plus délicat, car `ListeTachesAPI` ne fait pas que lire les données : il
les modifie localement après `basculerTache`, `supprimerTacheAPI` et
`ajouterTache` (`setTaches(...)`). Réfléchis à comment utiliser
`setDonnees` (retourné par `useFetch`) à la place de `setTaches` dans ces
trois fonctions, pour que la liste continue à se mettre à jour sans tout
recharger depuis le serveur.

Ce n'est pas obligatoire pour valider le jour — à toi de voir si tu veux
t'y frotter aujourd'hui ou plus tard.

## Test

1. Vérifie que `/taches/:id` fonctionne toujours à l'identique après le
   refactor (chargement, affichage, erreur si mauvais id, lien retour).
2. Si tu fais le bonus : vérifie que la liste, la création, le
   cocher/décocher et la suppression fonctionnent toujours normalement.
