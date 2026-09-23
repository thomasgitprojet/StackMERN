# Jour 18 — TypeScript appliqué à React

On reprend `jour-12-react-api` et on y introduit TypeScript, en
convertissant une petite partie du projet plutôt que tout d'un coup —
c'est d'ailleurs comme ça qu'une vraie migration JS → TS se fait en
entreprise : progressivement, fichier par fichier, JS et TS coexistant
sans problème le temps de la transition.

`typescript`, `@types/react`, `@types/react-dom` ont été ajoutés au
`package.json`, ainsi qu'un `tsconfig.json` (avec `allowJs: true`, donc
les fichiers `.jsx` restants continuent de fonctionner sans être
vérifiés par TypeScript).

## Installation

```
cd jour-12-react-api
npm install
```

## 1. Compléter `src/types.ts`

Le fichier est déjà créé avec les instructions en commentaire.
Complète l'interface `Tache`.

## 2. Convertir `NouvelleTache.jsx` en `.tsx`

Dans ton éditeur, renomme `src/NouvelleTache.jsx` en
`src/NouvelleTache.tsx` (clic droit → Renommer, ou `F2` dans VS Code). Le
contenu ne change pas pour l'instant — seule l'extension change.

Mets ensuite à jour l'import dans `ListeTachesAPI.jsx` pour qu'il pointe
vers le nouveau nom de fichier.

## 3. Typer les props

Lance `npm run check` : TypeScript va se plaindre que les paramètres de
`NouvelleTache` (`{ token, onTacheCreee }` ou `{ onTacheCreee }` selon
l'état actuel de ton fichier) ont un type implicite `any`, ce qui est
interdit avec `strict: true`.

Corrige ça en déclarant une interface pour les props juste au-dessus du
composant, par exemple :

```typescript
interface NouvelleTacheProps {
  onTacheCreee: (tache: Tache) => void;
}
```

(remarque le type de `onTacheCreee` : ce n'est pas juste "une fonction",
c'est précisément "une fonction qui prend une `Tache` et ne retourne
rien" — `void`. Importe `Tache` depuis `./types`.)

Utilise ensuite cette interface pour typer les props du composant :
`export default function NouvelleTache({ onTacheCreee }: NouvelleTacheProps)`.

## 4. Refaire tourner `npm run check`

Corrige les erreurs restantes une par une jusqu'à ce que `npm run check`
soit propre. Certaines apparaîtront peut-être sur du code interne au
composant (states, paramètres de fonctions) — TypeScript t'indiquera où
et pourquoi à chaque fois.

## Test

1. `npm run check` ne doit renvoyer aucune erreur.
2. `npm run dev` : vérifie que la création de tâche fonctionne toujours
   exactement comme avant — TypeScript ne doit rien changer au
   comportement de l'application, seulement à la vérification statique
   du code.
