import { Tache } from "../models/tache.model.js";
import mongoose from "mongoose";
// Contrôleurs : la logique métier de chaque route (lire/valider/manipuler
// le tableau `taches`, construire la réponse). Les fichiers de routes
// (dans ../routes) ne font qu'associer une URL + méthode HTTP à la
// fonction correspondante ici — c'est la séparation "routes / contrôleurs"
// vue en théorie du Jour 4.

export const taches = [
  { id: 1, titre: "Créer le serveur Express", terminee: false },
  { id: 2, titre: "Lire la documentation Express", terminee: false },
  { id: 3, titre: "Modifier une route existante", terminee: true },
];

// À toi d'écrire les fonctions ci-dessous (et de les exporter) :
//
// export function listerTaches(req, res) { ... }         GET /api/taches


export function listerTachesBasic(req, res) {
  res.status(200).json(taches);
}
export async function listerTaches(req, res, next) {
  try {
    const toutesLesTaches = await Tache.find();
    res.status(200).json(toutesLesTaches);
  } catch (error) {
    next(error);
  }
}




// export function obtenirTache(req, res) { ... }          GET /api/taches/:id
export function obtenirTacheBasic(req, res) {
  // parseInt() convertit une chaîne de caractères en nombre entier.
  // req.params.id est toujours une chaîne (ex: "2"), même si l'URL ne
  // contient que des chiffres — on la convertit pour pouvoir la comparer
  // avec tache.id, qui est un vrai nombre dans le tableau `taches`.
  const id = parseInt(req.params.id, 10);
  // find() parcourt le tableau et retourne le PREMIER élément qui valide
  // la condition (ici : id identique), ou `undefined` si aucun ne correspond.
  const tache = taches.find((tache) => tache.id === id);
  if (tache) {
    res.status(200).json(tache);
  } else {
    res.status(404).json({ message: "Tache introuvable" });
  }
}
export async function obtenirTache(req, res, next) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
     return res.status(400).json({ message: "Format d' ID invalide" });
    } 
    const tache = await Tache.findById(id);
    if (tache) {
      res.status(200).json(tache);
    } else {
      res.status(404).json({ message: "Tache introuvable" });
    }
  } catch (error) {
    next(error);
  }
}


// export function creerTache(req, res) { ... }             POST /api/taches
export function creerTacheBasic(req, res) {
  const { titre } = req.body;
  if (titre && titre.length >= 3) {
    const nouvelleTache = {
      id: taches.length + 1,
      titre,
      terminee: false,
    };
    taches.push(nouvelleTache);
    res.status(201).json(nouvelleTache);
  } else {
    res.status(400).json({ message: "Titre trop court" });
  }
}
export async function creerTache(req, res, next) {
  try {
    const { titre } = req.body;
    if (titre && titre.length >= 3) {
      const nouvelleTache = await Tache.create({ titre });
      res.status(201).json(nouvelleTache);
    } else {
      res.status(400).json({ message: "Titre trop court" });
    }
  } catch (error) {
    next(error);
  }
}


// export function modifierTache(req, res) { ... }          PUT /api/taches/:id
export function modifierTacheBasic(req, res) {
  // parseInt() : voir obtenirTache ci-dessus — même conversion nécessaire,
  // req.params.id arrive toujours en chaîne de caractères.
  const id = parseInt(req.params.id, 10);
  const { titre, terminee } = req.body;
  // find() : retourne la tâche correspondante (une référence vers l'objet
  // réel du tableau, pas une copie — c'est pour ça que la modifier directement
  // via tache.titre = ... met bien à jour le tableau `taches`), ou
  // `undefined` si aucun id ne correspond.
  const tache = taches.find((tache) => tache.id === id);

  // Deux vérifications distinctes, pour deux erreurs distinctes :
  // - la tâche n'existe pas → 404
  // - la tâche existe mais le titre envoyé est invalide → 400
  if (!tache) {
    return res.status(404).json({ message: "Tache introuvable" });
  }
  if (!titre || titre.length < 3) {
    return res.status(400).json({ message: "Titre trop court" });
  }

  tache.titre = titre;
  tache.terminee = terminee;
  res.status(200).json(tache);
}
export async function modifierTache(req, res, next) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Format d' ID invalide" });
    }
    const { titre, terminee } = req.body;
    if (!titre || titre.length <= 3){
      return res.status(400).json({ message: "Titre trop court" });
    }
    const tache = await Tache.findByIdAndUpdate(id, { titre, terminee }, { new: true });
    if (!tache) {
      return res.status(404).json({ message: "Tache introuvable" });
    }   
    res.status(200).json(tache);
  } catch (error) {
    next(error);
  }
}


// export function supprimerTache(req, res) { ... }         DELETE /api/taches/:id
export function supprimerTacheBasic(req, res) {
  // parseInt() : toujours la même conversion chaîne → nombre.
  const id = parseInt(req.params.id, 10);
  // findIndex() ressemble à find(), mais retourne la POSITION (index) de
  // l'élément trouvé dans le tableau, pas l'élément lui-même — ou -1 si
  // rien ne correspond. On en a besoin ici parce que splice() (juste en
  // dessous) travaille avec une position, pas avec l'objet directement.
  const index = taches.findIndex((tache) => tache.id === id);
  if (index !== -1) {
    // splice(index, 1) retire 1 élément du tableau à partir de la
    // position `index`, en modifiant le tableau `taches` sur place.
    taches.splice(index, 1);
    res.status(200).json({ message: "Tache supprimée" });
  } else {
    res.status(404).json({ message: "Tache introuvable" });
  }
}

export async function supprimerTache(req, res, next) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Format d' ID invalide" });
    }
    const tache = await Tache.findByIdAndDelete(id);
    if (!tache) {
      return res.status(404).json({ message: "Tache introuvable" });
    }
    res.status(200).json({ message: "Tache supprimée" });
  } catch (error) {
    next(error);
  }
}