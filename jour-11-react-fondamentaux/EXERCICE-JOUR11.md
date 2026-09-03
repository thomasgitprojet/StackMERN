# Jour 11 — Fondamentaux React (composants, props, state, listes)

```bash
npm install
npm run dev
```

Ouvre ensuite l'URL affichée dans le terminal (généralement
`http://localhost:5173`).

`App.jsx` est déjà scaffoldé et assemble les trois composants ci-dessous.
Tu n'as besoin de rien modifier dans `App.jsx` pour cette séance —
concentre-toi sur les trois fichiers de composants.

## 1. `Profil.jsx` — props

Affiche les props `nom` et `role` reçues depuis `App.jsx`, par exemple :

```
Ada Lovelace — Développeuse
```

Doc utile : [Transmettre des props à un composant](https://fr.react.dev/learn/passing-props-to-a-component).

## 2. `Compteur.jsx` — state avec `useState`

Ajoute un état `compte` initialisé à `0`, et trois boutons :

- "+1" incrémente le compteur.
- "-1" le décrémente.
- "Réinitialiser" le remet à `0`.

Affiche la valeur actuelle quelque part dans le JSX.

Doc utile : [useState](https://fr.react.dev/reference/react/useState).

## 3. `ListeTaches.jsx` — listes (`map` + `key`) et state

Deux parties :

**Partie A.** Affiche la prop `taches` (un tableau d'objets
`{ id, titre, terminee }`) avec `.map()`, un `<li>` par tâche affichant
le `titre`. Ajoute la prop `key={tache.id}` sur chaque élément généré.

**Partie B.** Rends la liste interactive : un clic sur une tâche doit
inverser son statut `terminee` (tu peux par exemple barrer le texte des
tâches terminées avec `textDecoration: "line-through"` en style inline,
ou simplement afficher une coche). Comme les props ne sont pas
modifiables, il te faut un state local initialisé à partir de la prop
reçue, et une fonction qui reconstruit un nouveau tableau (sans muter
l'ancien) à chaque clic.

Doc utile : [Rendre des listes](https://fr.react.dev/learn/rendering-lists),
[Mettre à jour des objets dans le state](https://fr.react.dev/learn/updating-objects-in-state).

## Test

Pour chaque composant, vérifie dans le navigateur que l'affichage est
correct et que les interactions (clics) fonctionnent comme attendu — pas
de tests automatisés aujourd'hui, l'inspection visuelle suffit.
