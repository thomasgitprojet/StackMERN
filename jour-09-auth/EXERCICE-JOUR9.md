# Jour 9 — Authentification (bcrypt + JWT)

Ce qui est déjà en place :

- `models/user.model.js` → schéma `User` (`email` unique, `password`).
- `routes/auth.routes.js` → les 3 routes déjà câblées vers le contrôleur
  (`register`, `login`, `profil`).
- `controllers/auth.controller.js` et `middlewares/auth.middleware.js` →
  vides, avec juste les signatures attendues en commentaire. C'est ton
  point de départ.
- `index.js` → connexion Mongoose, montage des routes sous `/api/auth`,
  middleware d'erreurs déjà en place (comme au Jour 8).

```bash
npm install
docker ps   # vérifie que mongo-formation tourne
cp .env.example .env   # (Copy-Item .env.example .env sous PowerShell)
```

Doc utile : [bcryptjs sur npm](https://www.npmjs.com/package/bcryptjs),
[jsonwebtoken sur npm](https://www.npmjs.com/package/jsonwebtoken).

## 1. Inscription — `register`

Dans `controllers/auth.controller.js` :

- Récupère `email` et `password` depuis `req.body`.
- Hache le mot de passe avec `bcrypt.hash(password, 10)` (le `10` est le
  "coût" du hachage — un nombre de tours plus élevé = plus lent mais plus
  sûr ; 10 est une valeur standard).
- Crée l'utilisateur en base avec le mot de passe **haché**, jamais le
  mot de passe en clair.
- Réponds `201` avec l'utilisateur créé — mais réfléchis : est-ce une
  bonne idée de renvoyer le champ `password` (même haché) dans la
  réponse JSON ? Si non, comment l'exclure ?
- Pense au cas où l'email existe déjà (contrainte `unique` du schéma) :
  quelle erreur Mongoose est levée, et quel code de statut renvoyer ?

## 2. Connexion — `login`

- Récupère `email` et `password` depuis `req.body`.
- Cherche l'utilisateur correspondant à cet email. S'il n'existe pas,
  renvoie une erreur (401, pas 404 — on ne veut pas révéler si un email
  existe ou non).
- Compare le mot de passe reçu avec le hash stocké via
  `bcrypt.compare(password, user.password)` — jamais de comparaison
  directe (`===`) sur des mots de passe hachés.
- Si la comparaison échoue, renvoie 401 également (même message que
  ci-dessus, pour ne pas indiquer si c'est l'email ou le mot de passe qui
  est faux).
- Si tout est bon, génère un token avec
  `jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })`
  et renvoie-le au client (`res.json({ token })`).

## 3. Middleware de protection — `verifierToken`

Dans `middlewares/auth.middleware.js` :

- Lis l'en-tête `Authorization` (`req.headers.authorization`). Il arrive
  sous la forme `"Bearer <token>"` — il faut extraire seulement le token.
- Si l'en-tête est absent, réponds `401`.
- Sinon, vérifie le token avec `jwt.verify(token, process.env.JWT_SECRET)`.
  Cette fonction lève une erreur si le token est invalide ou expiré —
  pense à l'englober dans un `try/catch` et à répondre `401` en cas
  d'échec (pas `next(error)` vers le middleware 500 : un token invalide
  n'est pas une erreur serveur).
- Si le token est valide, `jwt.verify()` te renvoie le payload déchiffré
  (ce que tu as mis dans `jwt.sign()`, donc `{ id, iat, exp }`). Attache-le
  à la requête (`req.user = decoded`) puis appelle `next()`.

## 4. Route protégée — `profil`

- Une fois `verifierToken` passé, `req.user.id` est disponible.
- Récupère l'utilisateur correspondant en base avec `User.findById(req.user.id)`
  et renvoie-le (toujours sans le mot de passe).

## 5. Tester le flux complet

Avec `requests.http` :

1. `POST /api/auth/register` avec un email/mot de passe → `201`.
2. `POST /api/auth/register` une deuxième fois avec le même email → doit
   échouer proprement (pas un `500` brut).
3. `POST /api/auth/login` avec les bons identifiants → `200` + un token.
4. `POST /api/auth/login` avec un mauvais mot de passe → `401`.
5. `GET /api/auth/profil` sans en-tête `Authorization` → `401`.
6. `GET /api/auth/profil` avec le token reçu à l'étape 3 (colle-le dans
   `requests.http`) → `200` avec les infos de l'utilisateur.
