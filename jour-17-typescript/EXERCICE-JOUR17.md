# Jour 17 — Introduction à TypeScript

On sort de `jour-12-react-api` pour ce jour : plutôt que de convertir un
projet React entier d'un coup, on isole les bases de TypeScript dans ce
nouveau dossier, sur des exemples simples. L'application à React viendra
plus tard, une fois ces bases solides.

## Installation

```
cd jour-17-typescript
npm install
```

## Vérifier les types

Contrairement aux exercices précédents, il n'y a rien à "lancer" (`npm
run dev`) : TypeScript n'est pas exécuté, il est vérifié statiquement.
Après chaque modification, lance :

```
npm run check
```

Ça exécute `tsc --noEmit` : le compilateur TypeScript lit tes fichiers et
signale toute erreur de type dans le terminal, sans produire de fichier
JavaScript (`--noEmit`). Tu devrais aussi voir les erreurs directement
dans ton éditeur (soulignées en rouge) si l'extension TypeScript est
active.

## Exercices

Fais les exercices dans l'ordre, chacun dans son fichier
(`src/exercice1.ts`, `src/exercice2.ts`, `src/exercice3.ts`), déjà créés
avec les instructions détaillées en commentaire :

1. **`exercice1.ts`** — typer les paramètres et le retour d'une fonction
   simple.
2. **`exercice2.ts`** — décrire la forme d'un objet avec une `interface`,
   typer un tableau, typer une fonction qui filtre ce tableau.
3. **`exercice3.ts`** — champ optionnel (`?`), type union (`Tache |
   null`), et la nuance entre `undefined` (ce que renvoie `.find()`) et
   `null`.

## Test

Après chaque exercice, `npm run check` doit s'exécuter sans erreur. Si
`tsc` te signale une erreur que tu ne comprends pas, montre-la moi — les
messages d'erreur de TypeScript sont parfois denses au début.
