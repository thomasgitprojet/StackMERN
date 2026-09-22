// Jour 17 — Exercice 2 : typer un objet avec une interface
//
// Reprends la forme d'une tâche telle que renvoyée par mini-projet-1-api
// (voir mini-projet-1-api/models/tache.model.js) : un `_id` (string), un
// `titre` (string), un état `terminee` (boolean), et un `utilisateur`
// (string, l'id du propriétaire).
//
// 1. Déclare une interface `Tache` avec ces 4 champs.

interface Tache {
    _id: string;
    titre: string;
    terminee: boolean;
    utilisateur?: string;
}

//
// 2. Déclare une variable `taches` de type `Tache[]`, avec 2 ou 3 tâches
//    d'exemple écrites en dur (pas de fetch ici, juste des données
//    statiques pour tester le typage).

const taches: Tache[] = [
    { _id: "1", titre: "Tache 1", terminee: true, utilisateur: "1" },
    { _id: "2", titre: "Tache 2", terminee: false, utilisateur: "2" },
    { _id: "3", titre: "Tache 3", terminee: true, utilisateur: "3" },
];

//
// 3. Écris une fonction `tachesTerminees(taches: Tache[]): Tache[]` qui
//    retourne uniquement les tâches où `terminee` vaut `true` — même
//    logique que le .filter() de ListeTachesAPI.jsx (Jour 13), mais
//    typée cette fois.

function tachesTerminees(taches: Tache[]): Tache[] {
    return taches.filter((tache) => tache.terminee);
}
