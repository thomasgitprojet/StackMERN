import { useState } from "react";
import Connexion from "./Connexion.jsx";
import ListeTachesAPI from "./ListeTachesAPI.jsx";
import TacheDetail from "./TacheDetail.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

function RouteProtegee({ estAutorise, children }) {
  if (!estAutorise) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default function App() {
  const { token } = useAuth();
  
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Jour 12 — useEffect &amp; API</h1>

      <Routes>
        <Route path="/" element={token ? <Navigate to="/taches" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Connexion />} />
        <Route path="/taches" element={
          <RouteProtegee estAutorise={!!token}>
          <ListeTachesAPI />
          </RouteProtegee>
          } 
        />
        <Route path="/taches/:id" element={
          <RouteProtegee estAutorise={!!token}>
          <TacheDetail />
          </RouteProtegee>
          } 
        />
      </Routes>

    </div>
  );
}
