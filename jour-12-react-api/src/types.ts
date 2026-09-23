// Jour 18 — Exercice 1 : partager le type Tache
//
// Reprends l'interface `Tache` que tu as écrite au Jour 17
// (jour-17-typescript/src/exercice2.ts), et adapte-la à la vraie forme
// des données renvoyées par l'API (voir
// mini-projet-1-api/models/tache.model.js et
// mini-projet-1-api/controllers/taches.controller.js) :
// `_id` (string), `titre` (string), `terminee` (boolean), `utilisateur`
// (string).
//
// Exporte cette interface pour pouvoir l'importer ailleurs, par exemple :
// import type { Tache } from "./types";

export interface Tache {
  _id: string;
  utilisateur?: string;
  titre: string;
  terminee: boolean;
  creeLe: Date;
}
