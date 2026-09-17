// Jour 14 — Exercice 4 : page de détail d'une tâche
//
// Cette page sera affichée sur l'URL /taches/:id (route à déclarer par
// toi-même dans App.jsx).
//
// À toi d'écrire :
// 1. Récupère l'id présent dans l'URL avec le hook `useParams()`
//    (import { useParams } from "react-router-dom").
// 2. Un useEffect qui fait un fetch GET vers
//    `http://localhost:3000/api/taches/${id}` avec l'en-tête Authorization
//    — même pattern que fetchTaches dans ListeTachesAPI.jsx (Jour 12).
// 3. Affiche le titre et l'état (terminée / en cours) de la tâche reçue.
// 4. Ajoute un <Link to="/taches">Retour à la liste</Link>
//    (import { Link } from "react-router-dom") pour revenir en arrière
//    sans recharger la page.
//
// Cette page a besoin du `token` pour l'en-tête Authorization : réfléchis
// à comment le lui transmettre depuis la route déclarée dans App.jsx
// (même principe que pour ListeTachesAPI).
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function TacheDetail() {
  const [tache, setTache] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const { id } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    async function fetchTache() {
      try {
        const response = await fetch(`http://localhost:3000/api/taches/${id}`, {
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
        setTache(data);
        setChargement(false);
      } catch (error) {
        setChargement(false);
        setErreur("Impossible de contacter le serveur")
      }
    }
    fetchTache();
  }, [id, token]);

  return <div>
    {chargement ? "Chargement..." : erreur ? erreur : tache && 
    <div>
      <ul>
        <li>{tache.titre}</li>
        <li>{tache.terminee ? "Terminee" : "En cours"}</li>
      </ul>
    </div>}
    <Link to="/taches">Retour à la liste</Link>
  </div>;
}
