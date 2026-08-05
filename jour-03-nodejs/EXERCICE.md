# Exercice Jour 3 — Découverte de Node.js

Contrairement aux jours précédents, ce dossier ne contient volontairement
**pas** de `package.json` — le mettre en place fait partie de l'exercice 1.

## 1. Initialiser le projet

Dans ce dossier (`jour-03-nodejs/`) :

```bash
npm init -y
```

Ouvre le `package.json` généré et ajoute un script `start` qui exécute ton
fichier principal, par exemple :

```json
"scripts": {
  "start": "node index.js"
}
```

Si tu veux utiliser `import`/`export` (comme dans `api.js` au Jour 1) plutôt
que `require`, ajoute aussi `"type": "module"` dans ce `package.json`.

Vérifie que `node -v` fonctionne dans ton terminal (sinon, il faut installer
Node.js). Crée un `index.js` minimal (`console.log("ok")`) et lance
`npm start` pour confirmer que tout est branché.

## 2. Lire un fichier JSON

Le fichier `produits.json` (déjà présent dans ce dossier) contient une liste
de produits. Écris un script qui :
- lit ce fichier de façon **asynchrone** (`fs/promises`, pas la version
  `Sync`) ;
- le parse en JSON ;
- affiche uniquement les produits dont le prix dépasse un seuil de ton choix
  (par exemple 50€).

## 3. Écrire un fichier de log

Écris un script qui, à chaque exécution, **ajoute** une ligne à un fichier
`log.txt` (le crée s'il n'existe pas), avec la date/heure du moment et un
message court — par exemple :

```
[2026-08-05T09:12:03.000Z] Script exécuté
```

Utilise `appendFile` (pas `writeFile`, qui écraserait le fichier à chaque
fois). Lance le script plusieurs fois de suite et vérifie que `log.txt`
s'allonge à chaque exécution plutôt que d'être remplacé.
