// Exercice 1 — Créer une tâche (formulaire + fetch POST)
//
// Ce composant reçoit deux props :
// - `token` : pour l'en-tête Authorization (route protégée).
// - `onTacheCreee` : une fonction à appeler avec la tâche nouvellement
//   créée une fois la requête réussie, pour que le composant parent
//   (ListeTachesAPI) puisse l'ajouter à son state sans tout recharger.
//
// À toi d'écrire :
// 1. Un champ contrôlé pour le titre (même pattern que Connexion.jsx).
// 2. Un <form onSubmit={...}> qui envoie un fetch en POST vers
//    http://localhost:3000/api/taches, avec :
//    - headers: Content-Type (tu envoies un body) ET Authorization
//      (route protégée) — les deux en même temps, dans le même objet.
//    - body: JSON.stringify({ titre }).
// 3. Si la réponse est ok, récupère la tâche créée
//    (const nouvelleTache = await response.json()) et appelle
//    onTacheCreee(nouvelleTache).
// 4. Vide le champ titre après une création réussie (remets le state à "").
// 5. Gère le cas d'erreur comme dans Connexion.jsx (pas obligatoire de
//    dupliquer un state erreur séparé si tu préfères rester simple pour
//    cet exercice — à toi de voir).
//
import { useState } from "react";

export default function NouvelleTache({ token, onTacheCreee }) {
  const [titre, setTitre] = useState("");
  const [erreur, setErreur] = useState(null);
  const [envoiEnCours, setEnvoiEnCours] = useState(false);


  async function handleSubmit(event) {
    event.preventDefault();
    setErreur(null);

    if (titre.trim().length < 3) {
      setErreur("Le titre doit faire au moins 3 caractères");
      return;
    }

    setEnvoiEnCours(true);
    try {
      const response = await fetch("http://localhost:3000/api/taches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titre }),
      });
      if (!response.ok) {
        const { message } = await response.json();
        setErreur(message);
        return;
      }
      const nouvelleTache = await response.json();
      onTacheCreee(nouvelleTache);
      setTitre("");
    } catch (error) {
      setErreur("Impossible de contacter le serveur");
    } finally {
      setEnvoiEnCours(false);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setTitre(e.target.value)} value={titre} placeholder="Titre"/>
      <button type="submit" disabled={envoiEnCours}>{envoiEnCours ? "Création..." : "Créer"}</button>
      {erreur && <p>{erreur}</p>}
    </form>
  );
}
