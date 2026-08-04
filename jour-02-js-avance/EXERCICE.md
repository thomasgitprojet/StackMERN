# Exercice Jour 2 — Modules ES, tableaux fonctionnels, `this`

Ce dossier a son propre `package.json` (`"type": "module"`), donc tu peux
exécuter n'importe quel fichier `.js` directement avec Node :

```bash
node main.js
```

## 1. Modules ES

Crée `math.js` (2-3 fonctions utilitaires exportées) et `main.js` (qui les
importe et les utilise). Utilise `import`/`export`, pas `require`.

## 2. `map` / `filter` / `reduce`

À partir d'un tableau d'objets `{ nom, prix, categorie }` de ton choix,
produis dans un fichier `produits.js` :
- la liste des noms d'une catégorie donnée (`filter` + `map`) ;
- le prix total de tous les produits (`reduce`).

## 3. `this`

Dans un fichier `contexte-this.js`, crée un objet avec une méthode qui
utilise `this`. Appelle-la normalement, puis passe-la en callback à
`setTimeout` — observe la perte de contexte dans la console, puis corrige
avec une fonction fléchée.
