// Exercice 2 — State (useState)
//
// À toi d'ajouter un état `compte` (valeur initiale : 0) avec useState,
// et trois boutons : "+1", "-1", et "Réinitialiser" (retour à 0).
// Affiche la valeur actuelle du compteur quelque part dans le JSX.
//
import { useState } from "react";

export default function Compteur() {
  const [compte, setCompte] = useState(0);

  function increment() {
    setCompte(compte +1);
    //setCompte((c) => c + 1)
  }
  function decrement() {
    setCompte(compte -1);
  }
  function reset() {
    setCompte(0);
  }

  return (
    <div>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Réinitialiser</button>
      <p>{compte}</p>
    </div>
  );
}
