import { useEffect, useState } from "react";
import { getUtilisateurs, getUtilisateurAvecPosts, creerPost } from "./api";

function App() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [utilisateurDetail, setUtilisateurDetail] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    getUtilisateurs()
      .then((data) => {
        setUtilisateurs(data);
        setChargement(false);
      })
      .catch((err) => {
        setErreur(err.message);
        setChargement(false);
      });
  }, []);

  function afficherDetail(id) {
    setChargement(true);
    getUtilisateurAvecPosts(id)
      .then((data) => {
        setUtilisateurDetail(data);
        setChargement(false);
      })
      .catch((err) => {
        setErreur(err.message);
        setChargement(false);
      });
  }

  function ajouterPost() {
    creerPost("Mon nouveau post", "Contenu de test", 1)
      .then((nouveauPost) => {
        console.log("Post créé :", nouveauPost);
        alert(`Post créé avec l'id ${nouveauPost.id}`);
      })
      .catch((err) => setErreur(err.message));
  }

  if (chargement) return <p>Chargement...</p>;
  if (erreur) return <p>Erreur : {erreur}</p>;

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: 600 }}>
      <h1>Exercice Jour 1 — Async/Await</h1>
      <p>
        Ce projet utilise volontairement l'ancien style <code>.then()</code>{" "}
        dans <code>src/api.js</code>. Convertis ces 3 fonctions en{" "}
        <code>async</code>/<code>await</code> avec <code>try/catch</code>,
        sans rien changer côté <code>App.jsx</code> — si la conversion est
        correcte, l'appli doit continuer à fonctionner à l'identique.
      </p>

      <h2>Utilisateurs</h2>
      <ul>
        {utilisateurs.map((u) => (
          <li key={u.id}>
            {u.name}{" "}
            <button onClick={() => afficherDetail(u.id)}>Voir détail</button>
          </li>
        ))}
      </ul>

      {utilisateurDetail && (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}>
          <h3>{utilisateurDetail.name}</h3>
          <p>{utilisateurDetail.email}</p>
          <p>{utilisateurDetail.posts.length} posts</p>
        </div>
      )}

      <button onClick={ajouterPost} style={{ marginTop: "1rem" }}>
        Créer un post de test
      </button>
    </div>
  );
}

export default App;
