// Exercice 1 — Props
//
// Ce composant reçoit deux props depuis App.jsx : `nom` et `role`.
// À toi d'écrire le JSX qui les affiche (par exemple dans un <p>).
//
// Rappel : les props arrivent comme un objet, premier paramètre de la
// fonction. Tu peux soit écrire `props.nom`, soit déstructurer
// directement dans les paramètres : `function Profil({ nom, role }) { ... }`.

export default function Profil({ nom, role }) {
  return (
    <div>
      <p className="name">{nom}</p> 
      <p className="role">{role}</p>
    </div>
  );
}
