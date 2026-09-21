// Jour 16 — Exercice 1 : hook personnalisé useFetch
//
// Objectif : extraire le pattern commun à ListeTachesAPI.jsx et
// TacheDetail.jsx (chargement, erreur, données, fetch avec en-tête
// Authorization) dans un hook réutilisable, pour ne plus le dupliquer.
//
// À toi d'écrire un hook `useFetch(url)` qui :
//
// 1. Déclare trois states : `donnees` (initialisé à null), `chargement`
//    (initialisé à true), `erreur` (initialisé à null).
// 2. Récupère `token` via useAuth() — le hook a besoin de l'en-tête
//    Authorization, comme les fetch existants.
// 3. Un useEffect (dépendances : [url, token] — réfléchis à pourquoi
//    `url` doit en faire partie) qui, via une fonction async définie
//    puis appelée à l'intérieur (même pattern que fetchTaches/fetchTache) :
//    - fait un fetch vers `url` avec l'en-tête Authorization,
//    - si la réponse n'est pas ok, bascule `erreur` avec un message,
//    - sinon, met à jour `donnees` avec les données reçues,
//    - dans tous les cas, repasse `chargement` à false à la fin.
// 4. Retourne { donnees, setDonnees, chargement, erreur } — le `setDonnees`
//    en plus sera utile si un composant a besoin de mettre à jour les
//    données localement après une mutation (voir EXERCICE-JOUR16.md,
//    exercice bonus sur ListeTachesAPI).
//
// Attention : le nom doit commencer par "use" pour que React (et les
// règles des Hooks) reconnaissent cette fonction comme un hook.

import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";

export function useFetch(url) {
  const [donnees, setDonnees] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchDonnees() {
      try {
        setErreur(null);
        setChargement(true);
        const response = await fetch(url, {
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
        setDonnees(data);
        setChargement(false);
      } catch (error) {
        setChargement(false);
        setErreur("Impossible de contacter le serveur")
      }
    }
    fetchDonnees();
  }, [url, token]);
  return { donnees, setDonnees, chargement, erreur, setErreur };
}
