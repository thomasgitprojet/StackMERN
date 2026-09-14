// Exercice 2 — useEffect + fetch (GET protégé)
//
// Ce composant reçoit une prop `token` (fournie par App.jsx une fois
// connecté). À toi d'écrire :
//
// 1. Trois states : `taches` (tableau, initialisé à []), `chargement`
//    (booléen, initialisé à true), `erreur` (chaîne ou null).
// 2. Un useEffect (tableau de dépendances [token] ou [], à toi de choisir
//    lequel a du sens ici et pourquoi) qui définit une fonction async
//    interne, laquelle :
//    - appelle fetch sur http://localhost:3000/api/taches avec l'en-tête
//      `Authorization: Bearer ${token}`,
//    - si la réponse n'est pas ok, bascule `erreur` avec un message,
//    - sinon, met à jour `taches` avec les données reçues,
//    - dans tous les cas, repasse `chargement` à false à la fin.
// 3. Dans le JSX : affiche "Chargement..." si `chargement` est vrai,
//    le message d'erreur si `erreur` n'est pas null, sinon la liste des
//    tâches (réutilise ce que tu as fait au Jour 11 pour le rendu de
//    liste avec .map()).
//
import { useState, useEffect } from "react";
import NouvelleTache from "./NouvelleTache.jsx";
import { Link } from "react-router-dom";

// Jour 13 — Exercice 2 (modifier) et Exercice 3 (supprimer)
//
// À toi d'écrire, sur le même modèle que fetchTaches ci-dessous :
//
// async function basculerTache(id, tache) {
//   - fetch en PUT vers `http://localhost:3000/api/taches/${id}`
//   - headers : Content-Type + Authorization (tu envoies un body ET
//     la route est protégée)
//   - body : JSON.stringify({ titre: tache.titre, terminee: !tache.terminee })
//     (relis modifierTache côté serveur, Jour 8/10 : il attend titre ET
//     terminee ensemble, pas juste le champ que tu changes)
//   - si ok, mets à jour le state `taches` : remplace la tâche modifiée
//     par la nouvelle version reçue du serveur (.map(), comme au Jour 11)
//
// async function supprimerTacheAPI(id) {
//   - fetch en DELETE vers `http://localhost:3000/api/taches/${id}`
//   - headers : Authorization seulement (pas de body à envoyer ici)
//   - si ok, retire la tâche du state `taches` (.filter(), comme au Jour 5)
//
// Ces deux fonctions n'ont pas besoin d'être dans le useEffect : elles se
// déclenchent au clic, pas au montage du composant.

export default function ListeTachesAPI({ token }) {
  const [taches, setTaches] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // Exercice 1 (suite) : NouvelleTache appelle cette fonction avec la
  // tâche créée par le serveur — ajoute-la au state sans tout recharger.
  function ajouterTache(nouvelleTache) {
    setTaches([...taches, nouvelleTache]);
  }

  useEffect(() => {
    async function fetchTaches() {
      try {
        setErreur(null);
        const response = await fetch("http://localhost:3000/api/taches", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const { message } = await response.json();
          setChargement(false);
          setErreur(message);
          return;
        }
        const data = await response.json();
        setTaches(data);
        setChargement(false);
      } catch (error) {
        setChargement(false);
        setErreur("Impossible de contacter le serveur")
      }
      
    }
    fetchTaches();

  }, [token]);

  async function basculerTache(id, tache) {
    console.log(id, tache);
    try {
      setErreur(null);
      const response = await fetch(`http://localhost:3000/api/taches/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titre: tache.titre, terminee: !tache.terminee }),
      });
      if (!response.ok) {
        const { message } = await response.json();
        setErreur(message);
        return;
      }
      const data = await response.json();
      setTaches(taches.map(tache => tache._id === id ? data : tache))
    } catch (error) {
      setErreur("Impossible de contacter le serveur")
    }
  }

  async function supprimerTacheAPI(id) {
    try {
      setErreur(null);
      const response = await fetch(`http://localhost:3000/api/taches/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const { message } = await response.json();
        setErreur(message);
        return;
      }
      setTaches(taches.filter(tache => tache._id !== id))
    } catch (error) {
      setErreur("Impossible de contacter le serveur")
    }
  }

  return (
    <div>
      <NouvelleTache token={token} onTacheCreee={ajouterTache} />
      {chargement ? ( "Chargement..." ) : erreur ? ( erreur ) : (
        <ul>
          {taches.map((tache) => (
            <li
              style={{ textDecoration: tache.terminee ? "line-through" : "none" }} 
              key={tache._id}>
              <Link to={`/taches/${tache._id}`}>{tache.titre}</Link>
              <button type="button" onClick={() => basculerTache(tache._id, tache )}>{tache.terminee ? "Terminé" : "En cours" }</button>
              <button onClick={() => supprimerTacheAPI(tache._id)}>Supprimer</button>
              {/* Exercice 2 : ajoute un onClick ici (ou sur un bouton dédié)
                  qui appelle basculerTache(tache._id, tache). Pense aussi
                  au style conditionnel du Jour 11 (textDecoration) pour
                  visualiser l'état terminee. */}
              {/* Exercice 3 : ajoute un <button> "Supprimer" qui appelle
                  supprimerTacheAPI(tache._id). Attention à onClick={() =>
                  ...} plutôt que d'appeler la fonction directement, sinon
                  elle s'exécute au rendu au lieu du clic (piège du Jour 11). */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
