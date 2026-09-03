// Exercice 3 — Listes (map + key) et state
//
// Ce composant reçoit une prop `taches` (le tableau défini dans App.jsx).
//
// Partie A : affiche la liste avec `.map()`, un <li> par tâche, avec son
// `titre`. N'oublie pas la prop spéciale `key` sur chaque élément généré
// (utilise `tache.id`).
//
// Partie B (state) : les props sont en lecture seule (rappel du cours),
// donc pour pouvoir cocher/décocher une tâche, il faut copier le tableau
// reçu dans un state local avec useState, initialisé à partir de la prop.
// Un clic sur une tâche doit inverser sa propriété `terminee` — attention,
// comme pour les tableaux vus au Jour 2/8, on ne mute jamais un tableau
// ou un objet de state directement : il faut recréer un nouveau tableau
// (par exemple avec `.map()`) et le passer à la fonction de mise à jour.
//
import { useState } from "react";

export default function ListeTaches({ taches }) {
  const [tachesState, setTachesState] = useState(taches);

  const listeTaches = tachesState.map((tache) => (
    <li 
      style={{ textDecoration: tache.terminee ? "line-through" : "none" }} 
      onClick={() => tacheTerminee(tache.id)} 
      key={tache.id}>{tache.titre}
    </li>
  ));
  
  function tacheTerminee(id) {
    console.log(id);
    setTachesState(tachesState.map((tache) => {
      if (tache.id === id) {
        return { ...tache, terminee: !tache.terminee };
      }
      console.log(tache);
      return tache;
    }));
  }
  
  
  return (
    <ul>
      {listeTaches}
    </ul>
  );
}
