// Exercice 1 — Formulaire contrôlé + fetch (POST)
//
// Ce composant reçoit une prop `onConnexion`, une fonction à appeler avec
// le token une fois la connexion réussie (elle vient de App.jsx : c'est
// `setToken`, mais ce composant n'a pas besoin de le savoir).
//
// À toi d'écrire :
// 1. Deux champs contrôlés (email, mot de passe) avec useState — même
//    principe que le Compteur du Jour 11 : value={email},
//    onChange={(e) => setEmail(e.target.value)}.
// 2. Un <form> avec un gestionnaire onSubmit. Attention : par défaut, la
//    soumission d'un formulaire HTML recharge la page — pense à appeler
//    `event.preventDefault()` en première ligne du gestionnaire.
// 3. Dans le gestionnaire, un appel fetch en POST vers
//    http://localhost:3000/api/auth/login (voir le Jour 9 pour la forme
//    de la requête et de la réponse).
// 4. Si la connexion réussit, appelle `onConnexion(token)` avec le token
//    reçu. Si elle échoue, affiche un message d'erreur (un state de plus).
//
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";


export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState(null);
  const { connecter } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setErreur(null);
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const { message } = await response.json();
        setErreur(message);
        return;
      }
      const { token } = await response.json();
      connecter(token);
      navigate("/taches");
    } catch (error) {
      setErreur("Impossible de contacter le serveur")
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email"/>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Mot de passe"/>
      <button type="submit">Connexion</button>
      {erreur && <p>{erreur}</p>}
    </form>
  );
}
