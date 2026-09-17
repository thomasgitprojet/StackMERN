// Jour 15 — Exercice 1 : Contexte d'authentification
//
// Ce fichier doit exporter :
//
// 1. Un contexte React (créé avec createContext) pour partager l'état de
//    connexion (le token) à travers l'application, sans avoir à le faire
//    passer en props à travers tous les composants intermédiaires
//    (App -> Route -> ListeTachesAPI -> ... ce qu'on appelle le
//    "prop drilling").
//
// 2. Un composant "Provider" (par exemple AuthProvider) qui :
//    - initialise un state `token` — mais pas à `null` comme avant :
//      va le chercher dans localStorage au tout premier rendu avec
//      localStorage.getItem("token") (qui renvoie null si la clé
//      n'existe pas).
//      Astuce : useState accepte une fonction en argument
//      (useState(() => ...)) — elle n'est exécutée qu'une seule fois,
//      au montage, au lieu d'être relue à chaque rendu.
//    - expose une fonction `connecter(token)` qui met à jour le state
//      ET appelle localStorage.setItem("token", token).
//    - expose une fonction `deconnecter()` qui remet le state à null
//      ET appelle localStorage.removeItem("token").
//    - fournit { token, connecter, deconnecter } aux composants
//      englobés via <AuthContext.Provider value={...}>{children}</AuthContext.Provider>.
//
// 3. (Bonus, facultatif) Un hook personnalisé useAuth() qui fait
//    simplement `return useContext(AuthContext);` — pratique pour éviter
//    d'importer AuthContext ET useContext dans chaque composant qui a
//    besoin du contexte.
//
// Voir EXERCICE-JOUR15.md pour la suite (où utiliser AuthProvider, et
// comment adapter les autres composants).

import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const navigate = useNavigate();
  const connecter = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const deconnecter = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={ { token, connecter, deconnecter} }>
      {children}
    </AuthContext.Provider>
  );
}
