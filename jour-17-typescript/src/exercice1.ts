// Jour 17 — Exercice 1 : typer une fonction simple
//
// Cette fonction est actuellement en JavaScript "non typé". Comme
// `strict` est activé dans tsconfig.json (ce qui inclut noImplicitAny),
// `npm run check` va déjà te signaler une erreur : les paramètres n'ont
// pas de type explicite et TypeScript refuse de leur donner le type
// implicite `any`.
//
// À toi d'ajouter les types : deux paramètres `number`, un retour
// `number`.
export function addition(a: number, b: number): number {
  return a + b;
}

export function saluer(nom: string): string {
  return `Bonjour, ${nom} !`;
}

// Bonus : écris une fonction `saluer` qui prend un paramètre `nom`
// (string) et retourne une chaîne de bienvenue (string), par exemple
// "Bonjour, <nom> !".
