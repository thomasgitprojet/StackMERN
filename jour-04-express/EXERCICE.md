# Exercice Jour 4 — Express, les fondamentaux

## Installation

```bash
npm install
```

## 1. Premier serveur

Crée `index.js` : un serveur Express avec une route `GET /` qui répond
`"Bonjour"`. Lance-le (`npm run dev` pour le rechargement automatique à
chaque sauvegarde, grâce à `node --watch`) et vérifie dans le navigateur ou
avec `curl http://localhost:3000`.

## 2. Routes CRUD en mémoire

Ajoute deux routes travaillant sur un tableau `taches` gardé en mémoire
(pas de fichier, pas de base de données — un simple tableau déclaré en haut
du fichier) :
- `GET /api/taches` — retourne la liste complète.
- `POST /api/taches` — ajoute une tâche à partir de `req.body` (pense à
  `express.json()` pour pouvoir lire le corps de la requête).

Teste avec `curl`, Postman, Insomnia, ou l'extension REST Client de VS Code
— pas avec le navigateur pour le `POST`, un navigateur ne peut pas facilement
envoyer une requête POST avec un corps JSON sans formulaire ou script.

## 3. Middleware personnalisé

Ajoute un middleware qui s'exécute sur **toutes** les requêtes et affiche
dans le terminal la méthode HTTP, l'URL, et l'heure de la requête — par
exemple :

```
[2026-08-06T09:00:00.000Z] GET /api/taches
```

Réfléchis à l'endroit où le placer dans le fichier (avant ou après les
routes ?) et à la raison pour laquelle cet emplacement compte.
