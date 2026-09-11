# Exercice Jour 6 — MongoDB, les fondamentaux

Jour surtout pratique : pas de code JS aujourd'hui, l'objectif est de
manipuler MongoDB directement, avec Docker (que tu connais déjà) et
MongoDB Compass (l'interface graphique officielle).

## 1. Lancer MongoDB et s'y connecter

Démarre un conteneur MongoDB :

```bash
docker run -d -p 27017:27017 --name mongo-formation mongo
```

Vérifie qu'il tourne (`docker ps`), puis installe [MongoDB Compass](https://www.mongodb.com/try/download/compass)
si tu ne l'as pas déjà, et connecte-toi avec l'URI par défaut :

```
mongodb://localhost:27017
```

## 2. Créer une collection et insérer des documents

Dans Compass, crée une base (par exemple `formation`) et une collection
`taches` à l'intérieur. Insère-y **5 documents à la main**, avec des champs
variés — pas seulement `titre`, essaie d'imbriquer un peu de structure pour
voir comment MongoDB gère les objets et tableaux, par exemple :

```json
{
  "titre": "Apprendre MongoDB",
  "terminee": false,
  "priorite": "haute",
  "tags": ["formation", "backend"],
  "creePar": { "nom": "Thomas", "email": "thomas@example.com" }
}
```

Varie les valeurs entre les 5 documents (statuts différents, tags
différents, priorités différentes) — tu vas t'en servir juste après.

## 3. Requêtes simples

Toujours dans Compass (onglet "Documents", barre de filtre en haut), ou
dans le shell (`docker exec -it mongo-formation mongosh`) :

- Filtre les documents où `terminee` vaut `false`.
- Trie les résultats par un champ de ton choix (croissant puis décroissant).
- Limite l'affichage à 2 résultats.
- Filtre sur une valeur imbriquée, par exemple `tags` contenant `"backend"`.

Pas de rendu attendu à me montrer sous forme de fichier aujourd'hui — dis-moi
simplement ce que tu observes, notamment si quelque chose te surprend par
rapport à MySQL.
