import { useState } from "react";
import Connexion from "./Connexion.jsx";
import ListeTachesAPI from "./ListeTachesAPI.jsx";

export default function App() {
  // Le token n'existe nulle part tant que l'utilisateur ne s'est pas
  // connecté avec succès — Connexion.jsx le transmettra via `onConnexion`.
  const [token, setToken] = useState(null);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Jour 12 — useEffect &amp; API</h1>

      {!token ? (
        <Connexion onConnexion={setToken} />
      ) : (
        <ListeTachesAPI token={token} />
      )}
    </div>
  );
}
