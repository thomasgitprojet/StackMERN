// API publique JSONPlaceholder (gratuite, sans clé) : https://jsonplaceholder.typicode.com
const BASE_URL = "https://jsonplaceholder.typicode.com";

// ---------------------------------------------------------------------------
// EXERCICE (Jour 1) : ces 3 fonctions sont volontairement écrites à l'ancienne,
// avec des chaînes .then()/.catch(), comme dans un vieux projet React.
// Ton travail : les réécrire avec async/await + try/catch, sans changer
// leur comportement (mêmes valeurs retournées, mêmes erreurs levées).
// ---------------------------------------------------------------------------

// export function getUtilisateurs() {
//   return fetch(`${BASE_URL}/users`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Impossible de récupérer les utilisateurs");
//       }
//       return response.json();
//     })
//     .then((utilisateurs) => utilisateurs.slice(0, 5))
//     .catch((error) => {
//       console.error("Erreur getUtilisateurs:", error.message);
//       throw error;
//     });
// }

export async function getUtilisateurs() {
  try {
    const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) {
        throw new Error("Impossible de récupérer les utilisateurs");
      }
    const utilisateurs = await response.json();

    return utilisateurs.slice(0, 5);

  } catch (error) {
    console.error("Erreur getUtilisateurs:", error.message);
    throw error;
  }
}

// Celle-ci enchaîne deux appels dépendants : on récupère d'abord l'utilisateur,
// puis ses posts. C'est le cas le plus intéressant à convertir avec await,
// car les .then() imbriqués deviennent simplement deux lignes séquentielles.

// export function getUtilisateurAvecPosts(utilisateurId) {
//   let utilisateurTrouve;
//   return fetch(`${BASE_URL}/users/${utilisateurId}`)
//     .then((response) => {
//       if (!response.ok) throw new Error("Utilisateur introuvable");
//       return response.json();
//     })
//     .then((utilisateur) => {
//       utilisateurTrouve = utilisateur;
//       return fetch(`${BASE_URL}/posts?userId=${utilisateurId}`);
//     })
//     .then((response) => response.json())
//     .then((posts) => {
//       return { ...utilisateurTrouve, posts };
//     })
//     .catch((error) => {
//       console.error("Erreur getUtilisateurAvecPosts:", error.message);
//       throw error;
//     });
// }

export async function getUtilisateurAvecPosts(utilisateurId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${utilisateurId}`);
    if (!response.ok) throw new Error("Utilisateur introuvable");

    const utilisateur = await response.json();

    const postsResponse = await fetch(`${BASE_URL}/posts?userId=${utilisateurId}`);
    const posts = await postsResponse.json();

    return { ...utilisateur, posts };

  }catch (error) {
    console.error("Erreur getUtilisateurAvecPosts:", error.message);
    throw error;
  }
}

/////////////////////// AWAIT ALL PROMISES///////////////////////
// export async function getUtilisateurAvecPosts(utilisateurId) {
//   try {
//     const [reponseUtilisateur, reponsePosts] = await Promise.all([
//       fetch(`${BASE_URL}/users/${utilisateurId}`),
//       fetch(`${BASE_URL}/posts?userId=${utilisateurId}`),
//     ]);

//     if (!reponseUtilisateur.ok) throw new Error("Utilisateur introuvable");

//     const [utilisateur, posts] = await Promise.all([
//       reponseUtilisateur.json(),
//       reponsePosts.json(),
//     ]);

//     return { ...utilisateur, posts };
//   } catch (error) {
//     console.error("Erreur getUtilisateurAvecPosts:", error.message);
//     throw error;
//   }
// }
////////////////////////////////////////////////////////////////////

// export function creerPost(titre, corps, utilisateurId) {
//   return fetch(`${BASE_URL}/posts`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ title: titre, body: corps, userId: utilisateurId }),
//   })
//     .then((response) => {
//       if (!response.ok) throw new Error("Erreur lors de la création du post");
//       return response.json();
//     })
//     .catch((error) => {
//       console.error("Erreur creerPost:", error.message);
//       throw error;
//     });
// }

export async function creerPost(titre,corps,utilisateurId) {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: titre, body: corps, userId: utilisateurId }),
    });
    if (!response.ok) throw new Error("Erreur lors de la création du post");
    const post = await response.json();

    return post;

  }catch (error) {
    console.error("Erreur creerPost:", error.message);
    throw error;
  }
}
