import { useState } from "react";
import Connexion from "./Connexion.jsx";
import ListeTachesAPI from "./ListeTachesAPI.jsx";
import TacheDetail from "./TacheDetail.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

function RouteProtegee({ estAutorise, children }) {
  if (!estAutorise) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default function App() {
  // Le token n'existe nulle part tant que l'utilisateur ne s'est pas
  // connecté avec succès — Connexion.jsx le transmettra via `onConnexion`.
  const [token, setToken] = useState(null);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Jour 12 — useEffect &amp; API</h1>

      <Routes>
        <Route path="/" element={token ? <Navigate to="/taches" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Connexion onConnexion={setToken} />} />
        <Route path="/taches" element={
          <RouteProtegee estAutorise={!!token}>
          <ListeTachesAPI token={token}/>
          </RouteProtegee>
          } 
        />
        <Route path="/taches/:id" element={
          <RouteProtegee estAutorise={!!token}>
          <TacheDetail token={token}/>
          </RouteProtegee>
          } 
        />
      </Routes>

    </div>
  );
}
