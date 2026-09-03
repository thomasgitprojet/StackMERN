import Profil from "./Profil.jsx";
import Compteur from "./Compteur.jsx";
import ListeTaches from "./ListeTaches.jsx";

// Données de départ pour l'exercice 3 — pas besoin d'API ni de MongoDB
// aujourd'hui, on travaille avec un tableau JavaScript classique.
const tachesInitiales = [
  { id: 1, titre: "Découvrir les composants React", terminee: true },
  { id: 2, titre: "Comprendre les props", terminee: false },
  { id: 3, titre: "Manipuler le state avec useState", terminee: false },
];

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Jour 11 — Fondamentaux React</h1>

      <section>
        <h2>Exercice 1 — Props</h2>
        <Profil nom="Ada Lovelace" role="Développeuse" />
      </section>

      <section>
        <h2>Exercice 2 — State</h2>
        <Compteur />
      </section>

      <section>
        <h2>Exercice 3 — Listes</h2>
        <ListeTaches taches={tachesInitiales} />
      </section>
    </div>
  );
}
