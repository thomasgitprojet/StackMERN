// Jour 17 — Exercice 3 : types optionnels et union
//
// 1. Recrée (ou copie depuis exercice2.ts) l'interface `Tache`, mais
//    rends le champ `utilisateur` optionnel avec `?` :
//    `utilisateur?: string` — utile si une tâche peut exister sans
//    encore être assignée à quelqu'un.

interface Tache {
    _id: string;
    titre: string;
    terminee: boolean;
    utilisateur?: string;
}

//
// 2. Écris une fonction `trouverTache(taches: Tache[], id: string): Tache | null`
//    qui retourne la tâche dont `_id` correspond à `id`, ou `null` si
//    aucune tâche ne correspond.
//    Indice : `.find()` renvoie déjà `undefined` (pas `null`) quand rien
//    n'est trouvé — il faudra donc convertir ce cas toi-même pour que le
//    type de retour corresponde exactement à `Tache | null`.

function trouverTache(taches: Tache[], id: string): Tache | null {
    return taches.find((tache) => tache._id === id) || null;
}
